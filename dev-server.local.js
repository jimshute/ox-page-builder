module.exports = {
  // '/teach/api/v1/knowledge/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/teach/api/v1/knowledge': 'https://nei.netease.com/api/apimock/915a297537153aa851ae1f62243657fa/teach/api/v1/knowledge'
  //   }
  // },
  // '/teach/api/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/teach/api':
  //       'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/teach/api'
  //   }
  // },
  // '/api/v1/course/news': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/api/v1/course/news':
  //       'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/api/v1/course/news'
  //   }
  // },
  // '/admin/api/v1': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/admin/api/v1':
  //       'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/admin/api/v1'
  //   }
  // },
  // '/multimedia/api/v1/live/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/multimedia/api/v1/live/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/multimedia/api/v1/live/'
  //   }
  // },
  // '/teach/api/v1/live/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/teach/api/v1/live/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/teach/api/v1/live/'
  //   }
  // },
  // '/admin/api/v1/push': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/admin/api/v1/push': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/admin/api/v1/push'
  //   }
  // },
  // '/admin/api/v1/studyPage/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/admin/api/v1/studyPage/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/admin/api/v1/studyPage/'
  //   }
  // },
  // '/teach/api/v2/question/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/teach/api/v2/question/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/teach/api/v2/question/'
  //   }
  // },
  // '/admin/api/v1/red/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/admin/api/v1/red/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/admin/api/v1/red/'
  //   }
  // },
  // '/admin/api/v1/friends/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/admin/api/v1/friends/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/admin/api/v1/friends/'
  //   }
  // },
  // '/multimedia/api/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/multimedia/api/': 'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/multimedia/api/'
  //   }
  // },
  '/multimedia/api/': {
    target: 'https://api.aijiao100.com'
  },
  // '/teach/api/': {
  //   target: 'https://api.aijiao100.com'
  // },
  // '/api/': {
  //   target: 'https://api.aijiao100.com'
  // },
  // '/backend/api/': {
  //   target: 'https://api.aijiao100.com'
  // },
  // '/admin/api/': {
  //   target: 'https://api.aijiao100.com'
  // }
  '/admin/api/': {
    target: 'https://nei.netease.com',
    pathRewrite: {
      '^/admin/api':
        'https://nei.netease.com/api/apimock-v2/db08f702132abe3b238efd561a5e710b/admin/api'
    }
  }
  // '/multimedia/api/': {
  //   target: 'https://nei.netease.com',
  //   pathRewrite: {
  //     '^/multimedia/api':
  //       'https://nei.netease.com/api/apimock/47caa1376462197633155e6c54f7e188/multimedia/api'
  //   }

  // }
}
