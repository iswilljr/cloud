const request = require("supertest");
const app = require("./build/app");

const TEST_DIRNAME = "__cloud_api_test__";
const TEST_FILENAME = "test";
const TEST_PATH = `/${TEST_DIRNAME}/${TEST_FILENAME}`;

describe("Blob endpoint", () => {
	it("should read test file", async () => {
		const res = await request(app).get(`/blob${TEST_PATH}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.success).toEqual(true);
		expect(res.body.path).toEqual(TEST_PATH);
		expect(res.body.info.isFile).toEqual(true);
		expect(res.body.content.type).toEqual("file");
		expect(res.body.content.data).toEqual("ok\n");
	});
});
