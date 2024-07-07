import request from "supertest";

import app from "../src/app";

describe("Test app.ts", () => {
  var id = -1;

  test("/duty/create", async () => {
    const res = await request(app).post("/duty/create").send({ name: "Jest Test Create" });
    expect(res.statusCode).toBe(200);
    id = parseInt(res.body.id);
    expect(id).toBeGreaterThan(1);
  });

  test("/duty/update/:id", async () => {
    const res = await request(app).put("/duty/update/" + id).send({ name: "Jest Test Update" });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toEqual(1);
  });

  test("/duty/get/:id", async () => {
    const res = await request(app).get("/duty/get/" + id);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual("Jest Test Update");
  });

  test("/duty/list/current/pageSize/sortField/sortOrder", async () => {
    const res = await request(app).get("/duty/list/1/10/modified_date/descend");
    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBeInstanceOf(Array);
    expect(res.body.results).not.toHaveLength(0);
  });

  test("/duty/delete/:id", async () => {
    const res = await request(app).delete("/duty/delete/" + id);
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toEqual(1);
  });
});
