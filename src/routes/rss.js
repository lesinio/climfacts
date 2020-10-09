import posts from './blog/_posts.js';
import { canon_host, site_name} from '../../blog.config.js';

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
	<title><![CDATA[ClimFacts]]></title>
	<link>${canon_host}</link>
  <description><![CDATA[${site_name}]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
	<image>
		<url>${canon_host}/warming-stripes-small.jpg</url>
		<title><![CDATA[ClimFacts]]></title>
		<link>${canon_host}</link>
    </image>
	${posts.map(post => `
		<item>
			<title>${post.title}</title>
      <link>${canon_host}/${post.slug}</link>
      <guid isPermaLink="false">${canon_host}/${post.slug}</guid>
			<description><![CDATA[${post.preview}]]></description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>
	`).join('\n')}
</channel>
</rss>`;

export function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  const feed = renderXmlRssFeed(posts);
  res.end(feed);

}
