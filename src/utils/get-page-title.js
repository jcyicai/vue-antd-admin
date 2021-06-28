const title = 'JC Admin'

export default function getPageTitle(pageTitle) {
	if (pageTitle) {
		return `${pageTitle} - ${title}`
	}
	return `${title}`
}
