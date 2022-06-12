const request = require("supertest");
const app = require("./build/app").default;

const TEST_DIRNAME = "__cloud_api_test__";
const TEST_FILENAME_TXT = "test.txt";
const TEST_PATH_TXT = `/${TEST_DIRNAME}/${TEST_FILENAME_TXT}`;
const TEST_FILENAME_MD = "test.md";
const TEST_PATH_MD = `/${TEST_DIRNAME}/${TEST_FILENAME_MD}`;

describe("Blob endpoint", () => {
	it("should read test file", async () => {
		const res = await request(app).get(`/blob${TEST_PATH_TXT}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.success).toEqual(true);
		expect(res.body.path).toEqual(TEST_PATH_TXT);
		expect(res.body.info.isFile).toEqual(true);
		expect(res.body.content.type).toEqual("file");
		expect(res.body.content.data).toEqual("ok\n");
	});
	it("should read test file", async () => {
		const res = await request(app).get(`/blob${TEST_PATH_MD}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.success).toEqual(true);
		expect(res.body.path).toEqual(TEST_PATH_MD);
		expect(res.body.info.isFile).toEqual(true);
		expect(res.body.content.type).toEqual("markdown");
		expect(res.body.content.data).toEqual("# test\n");
	});
	it("should be a 400 request", async () => {
		const res = await request(app).get("/blob/i-hope-this-path-does-not-exist-and-will-cause-a-400");
		expect(res.statusCode).toEqual(400);
		expect(res.body.success).toEqual(false);
		expect(res.body).not.toHaveProperty("path");
		expect(res.body).not.toHaveProperty("info");
		expect(res.body).not.toHaveProperty("content");
		expect(res.body).toHaveProperty("message");
	});
});
