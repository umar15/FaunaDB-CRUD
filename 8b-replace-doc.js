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
				q.Replace(q.Ref(q.Collection("posts"), "291428678698533383"), {
					data: { title: "I love serverless apps" },
				})
			);
			console.log(
				"Document replaced in Container of Database: " +
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
