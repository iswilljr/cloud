const request = require("supertest");
const app = require("./build/app");

describe("List endpoint", () => {
	it("should list parent root directory", async () => {
		const res = await request(app).get("/ls");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("success");
		expect(res.body).toHaveProperty("info");
		expect(res.body).toHaveProperty("content");
		expect(res.body).toHaveProperty("path");
		expect(res.body.success).toEqual(true);
		expect(res.body.path).toEqual("/");
		expect(res.body.info.isDirectory).toEqual(true);
		expect(res.body.info.isFile).toEqual(false);
	});
	it("should read test directory", async () => {
		const dirname = "__cloud_api_test__";
		const res = await request(app).get(`/ls/${dirname}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("success");
		expect(res.body).toHaveProperty("info");
		expect(res.body).toHaveProperty("content");
		expect(res.body).toHaveProperty("path");
		expect(res.body.success).toEqual(true);
		expect(res.body.path).toEqual(`/${dirname}`);
		expect(res.body.info.isDirectory).toEqual(true);
		expect(res.body.info.isFile).toEqual(false);
		expect(res.body.content.type).toEqual("directory");
		expect(res.body.content.data.files).toHaveLength(1);
		expect(res.body.content.data.directories).toHaveLength(0);
	});
});
