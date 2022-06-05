/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

const axios = require('axios').default

module.exports = {
  build: {
    endpoint: 'https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=7&offset=1&_embed=1',
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
    },
  },
  events: {
    async beforeCreate(config) {
      try {
        // Fetch data from endpoint
        const { data } = await axios.get(config.build.endpoint)

        // Create the posts object
        config.posts = {}

        // Create a collection of 'all' posts that we fetched
        config.posts.all = data

        // Create an object with the last two posts
        config.posts.lastTwo = data.slice(-2)

        // Set featured image
        config.posts.featured = {}
        config.posts.featured.image = data[0]._embedded['wp:featuredmedia'][0]['source_url'] || 'https://via.placeholder.com/600x400'
      } catch (error) {
        console.error(error)
      }
    }
  },
  formattedDate(str) {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  },
  truncate(str, count = 60, clamp = ' [...]') {
    return `${str.split(' ').splice(0, count).join(' ')}${clamp}`
  },
}
