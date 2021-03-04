---
title: Bootstrapping Sign in with Twitter
description: Educational demo of Sign in with Twitter implemented in ruby and a complementary tutorial.
datePublished: '2014-05-07T00:00:00Z'
author: Luis Cipriani
tags: code, twitter, ruby, web, security, authentication
image: /img/posts/bsiwt-thumb.jpg
---

_This article was originally published in [Twitter Develop Blog](https://blog.twitter.com/developer/en_us/a/2014/bootstrapping-sign-in-with-twitter.html) during my time there as Developer Advocate._

Implementing [Sign in with Twitter](https://dev.twitter.com/docs/auth/sign-twitter) is a great way to seamlessly integrate the user experience of your app or site with the Twitter platform and enable users to share content generated in your app with their followers.

The first step to implementing Sign in with Twitter is using OAuth, a widely-adopted standard that enables third parties to access resources without having to exchange passwords. Even when the [specifications on how to implement OAuth](https://dev.twitter.com/docs/auth/implementing-sign-twitter) are detailed and clear, it can still be a complex and frustrating task.

That’s why we built some bootstrapping code in Ruby and Python to help you get started quickly and confidently, giving you more time to focus on your product. The examples are easy to install and try. Let’s do a walkthrough in the [Ruby implementation](https://github.com/lfcipriani/sign_in_with_twitter_sample), a lightweight Sinatra app. Note that the code follows the process outlined in the [Sign in with Twitter documentation](https://dev.twitter.com/docs/auth/implementing-sign-twitter).

## Step 1: Obtain the request token

When the user clicks “Sign in” in your application, the first step is to obtain a request token:

[Listing 1](https://github.com/lfcipriani/sign_in_with_twitter_sample/blob/master/app.rb#L48):

```ruby
get '/signin' do
  # After hitting Sign in link, first thing your app must do
  # is to get a request token.
  # See https://dev.twitter.com/docs/auth/implementing-sign-twitter (Step 1)
  token = TwitterSignIn.request_token

  # With request token in hands, you will just redirect
  # the user to authenticate at Twitter
  # See https://dev.twitter.com/docs/auth/implementing-sign-twitter (Step 2)
  redirect TwitterSignIn.authenticate_url(token)
end
```

The `request_token` method is implemented in the TwitterSignIn class like so:

[Listing 2](https://github.com/lfcipriani/sign_in_with_twitter_sample/blob/master/lib/twitter_sign_in.rb#L15):

```ruby
def request_token

    # The request to get request tokens should only
    # use consumer key and consumer secret, no token
    # is necessary
    response = TwitterSignIn.request(
    :post,
    "https://api.twitter.com/oauth/request_token",
    {},
    @oauth
    )

    obj = {}
    vars = response.body.split("&").each do |v|
    obj[v.split("=").first] = v.split("=").last
    end

    # oauth_token and oauth_token_secret should
    # be stored in a database and will be used
    # to retrieve user access tokens in next requests
    db = Daybreak::DB.new DATABASE
    db.lock { db[obj["oauth_token"]] = obj }
    db.close

    return obj["oauth_token"]
end
```

Basically, this request will return `oauth_token` and `oauth_token_secret` and these are your temporary credentials given by Twitter to request a user access token.

## Step 2: Redirect the user

Now we can redirect the user to /oauth/authenticate, passing the oauth_token obtained in the previous step.

[Listing 3](https://github.com/lfcipriani/sign_in_with_twitter_sample/blob/master/lib/twitter_sign_in.rb#L43):

```ruby
def authenticate_url(query)
    # The redirection need to be done with oauth_token
    # obtained in request_token request
    "https://api.twitter.com/oauth/authenticate?oauth_token=" + query
end
```

At this moment, the user will be redirected to Twitter and will be asked to authorize your app to have access to user resources. If the user grants access to your app, Twitter will redirect her or him to an URL set by you as a callback in your app configurations.

[Listing 4](https://github.com/lfcipriani/sign_in_with_twitter_sample/blob/master/app.rb#L60):

```ruby
# This callback will be called by user browser after
# being redirect by Twitter with successful authentication
# See https://dev.twitter.com/docs/auth/implementing-sign-twitter (end of Step 2)
get '/callback' do

  # Given that the user authorized us, we now
  # need to get its Access Token.
  # See https://dev.twitter.com/docs/auth/implementing-sign-twitter (Step 3)
  token = TwitterSignIn.access_token(params["oauth_token"], params["oauth_verifier"])
```

This redirection has a parameter called `oauth_verifier`, which is a confirmation that the user, still identified by the `oauth_token` obtained in the first step, has granted you access.

## Step 3: Convert the request token

Now you’re going to use all the tokens obtained so far to get the access token. The access token is what’s necessary in order to — as its name suggests — access Twitter on behalf of a user. Let’s take a look at the implementation of that step:

[Listing 5](https://github.com/lfcipriani/sign_in_with_twitter_sample/blob/master/lib/twitter_sign_in.rb#L49):

```ruby
def access_token(oauth_token, oauth_verifier)

    # To request access token, you need to retrieve
    # oauth_token and oauth_token_secret stored in
    # database
    db = Daybreak::DB.new DATABASE
    if dbtoken = db[oauth_token]

    # now the oauth signature variables should be
    # your app consumer keys and secrets and also
    # token key and token secret obtained in request_token
    oauth = @oauth.dup
    oauth[:token] = oauth_token
    oauth[:token_secret] = dbtoken["oauth_token_secret"]

    # oauth_verifier got in callback must
    # to be passed as body param
    response = TwitterSignIn.request(
        :post,
        "https://api.twitter.com/oauth/access_token",
        {:oauth_verifier => oauth_verifier},
        oauth
    )

    obj = {}
    vars = response.body.split("&").each do |v|
        obj[v.split("=").first] = v.split("=").last
    end

    # now the we got the access tokens, store it safely
    # in database, you're going to use it later to
    # access Twitter API in behalf of logged user
    dbtoken["access_token"] = obj["oauth_token"]
    dbtoken["access_token_secret"] = obj["oauth_token_secret"]
    db.lock { db[oauth_token] = dbtoken }

    else
    oauth_token = nil
    end

    db.close
    return oauth_token
end
```

The method `access_token` do a request to `POST /oauth/access_token` passing app consumer keys and oauth tokens inside OAuth signature; and the `oauth_verifier` obtained in Step 2 in the body of request. With that set of information, Twitter can validate this request to the access token as legitimate and return to the app the access tokens. That in turn will enable your app to do requests on behalf of the user who just granted you access. You can now store these tokens safely in your database.

## Step 4: Use the access token

This app implements a feature that lets you create a friendship between this user and an account you choose as an example of what can be done once you have been granted access.

[Listing 6](https://github.com/lfcipriani/sign_in_with_twitter_sample/blob/master/app.rb#L118):

```ruby
# Building oauth signature vars to use in this request
# Basically, it's our app consumer vars combined
# with user access tokens
oauth = @oauth.dup
oauth[:token] = dbtoken["access_token"]
oauth[:token_secret] = dbtoken["access_token_secret"]

# A POST request in https://dev.twitter.com/docs/api/1.1/post/friendships/create
# to make the logged user follow the ACCOUNT_TO_FOLLOW
response = TwitterSignIn.request(
    :post,
    "https://api.twitter.com/1.1/friendships/create.json",
    {:screen_name => ACCOUNT_TO_FOLLOW},
    oauth
)
```

### Summary

Now that you know how to implement Sign in with Twitter, check the [full source code](https://github.com/lfcipriani/sign_in_with_twitter_sample) to have a big picture of how the app works. If you are a Pythonist, check [@jaakkosf](https://twitter.com/jaakkosf)’s Python implementation at [https://github.com/jaakko-sf/twauth-web](https://github.com/jaakko-sf/twauth-web).

Have you built a Sign in with Twitter integration in another language besides English that can easily be converted to standalone code? Share it with us by Tweeting a Github link to your implementation [@TwitterDev](https://twitter.com/twitterdev). We will update this post with implementations in other languages.
