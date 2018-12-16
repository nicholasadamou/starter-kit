/* eslint-disable no-tabs */
module.exports = function () {
  /**
 * Template for banner to add to file headers.
 */
  const banner = {
    default:
		`/**!
		  * <%= package.title %> v<%= package.version %>
		  * <%= package.description %>
		  * (c) ${new Date().getFullYear()} <%= package.author.name %>
		  * <%= package.license %> License
		  * <%= package.repository.url %>
		  */`,
    min:
		`/**! <%= package.title %> v<%= package.version %> | (c) ${new Date().getFullYear()} <%= package.author.name %> | <%= package.license %> License | <%= package.repository.url %> */`
  }

  return banner
}
