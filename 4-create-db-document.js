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
				q.Create(q.Collection("posts"), {
					data: { title: "Serverless applications are scalable" },
				})
			);
			console.log(
				"Document Created and Inserted in Container: " + result.ref.id
			);
		} catch (error) {
			console.log(error);
		}
	} else {
		console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
	}
})();
