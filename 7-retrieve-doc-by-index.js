const faunadb = require("faunadb"),
	q = faunadb.query;

require("dotenv").config();

(async () => {
	if (process.env.FAUNADB_ADMIN_SECRET) {
		var client = new faunadb.Client({
			secret: process.env.FAUNADB_ADMIN_SECRET,
		});
		try {
			var result = await client.query(
				q.Get(
					q.Match(
						q.Index("post_by_title"),
						"Serverless applications are scalable"
					)
				)
			);
			console.log(
				"Document retrived from Container in Database: " +
					result.ref.id +
					" " +
					result.data.title
			);
		} catch (error) {
			console.log(error);
		}
	} else {
		console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
	}
})();
