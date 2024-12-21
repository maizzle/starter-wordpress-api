/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is the base configuration that Maizzle will use when you run commands
| like `npm run build` or `npm run dev`. Additional config files will
| inherit these settings, and can override them when necessary.
|
*/

import axios from 'axios'

/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    endpoint: 'https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=7&offset=1&_embed=1',
    content: ['emails/**/*.html'],
  },
  async beforeCreate({config}) {
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
  },
  formattedDate(str) {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  },
  truncate(str, count = 60, clamp = ' [...]') {
    return `${str.split(' ').splice(0, count).join(' ')}${clamp}`
  },
}
