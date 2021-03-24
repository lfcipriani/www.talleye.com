module.exports = {
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  redirects: async () => {
    // redirecting from lfcipriani.tumblr.com
    return [
      {
        source: '/post/65952280899',
        destination: '/posts/the-4-basic-flows-of-http-caching',
        permanent: true,
      },
      {
        source: '/post/62413346456',
        destination: '/posts/an-easy-way-to-build-autocomplete-search-for-api-docs',
        permanent: true,
      },
      {
        source: '/post/42035650273',
        destination: '/posts/alexandria-platform',
        permanent: true,
      },
      {
        source: '/post/24200885922',
        destination: '/posts/explaining-semantic-web',
        permanent: true,
      },
      {
        source: '/post/21380734930',
        destination: '/pt-BR/posts/extracao-de-dados-publicos-com-yql-yahoo-pipes-1',
        permanent: true,
      },
      {
        source: '/post/21381029425',
        destination: '/pt-BR/posts/extracao-de-dados-publicos-com-yql-yahoo-pipes-2',
        permanent: true,
      },
      {
        source: '/post/21364056907',
        destination: '/pt-BR/posts/brincando-com-apis-de-xmpp',
        permanent: true,
      },
      {
        source: '/post/21361278423',
        destination: '/pt-BR/posts/breve-introducao-ao-xmpp',
        permanent: true,
      },
    ];
  },
};
