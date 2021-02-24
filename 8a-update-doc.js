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
				q.Update(q.Ref(q.Collection("posts"), "291428678698533383"), {
					data: { tags: ["serverless", "Scalable"] },
				})
			);
			console.log(
				"Document updated in Container in Database: " +
					result.ref.id +
					" " +
					result.data.title
			);
			console.log("Tags Appended:");
			result.data.tags.map((t) => {
				console.log(t);
			});
		} catch (error) {
			console.log(error);
		}
	} else {
		console.log("No FAUNADB_ADMIN_SECRET in .env file, skipping DB setup");
	}
})();
