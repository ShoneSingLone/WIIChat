https: //link.zhihu.com/?target=https%3A//github.com/login/oauth/access_token

    let githubAuthorizeUrl = new URL('https: //github.com/login/oauth/authorize')
githubAuthorizeUrl.searchParams.append('scope', 'user')

axios({
    method: 'get',
    url: githubAuthorizeUrl
})