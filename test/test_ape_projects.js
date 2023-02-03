const ApeProjects = artifacts.require("ApeProjects");
const Bayc = artifacts.require("Bayc");
const Mayc = artifacts.require("Mayc");
const Warm = artifacts.require("WarmMock");
const defaultWebsite = "unset";

contract("ApeProjects", (accounts) => {
  it("should assert true", async () => {
    await ApeProjects.deployed();
    return assert.isTrue(true);
  });

  it("should have zero projects to begin", async () => {
    const ap = await ApeProjects.deployed();
    const numProjects = await ap._numProjects();
    assert.equal(numProjects, 0, "Should be zero to start");
  });

  it("owner can change website", async () => {
    const ap = await ApeProjects.deployed();
    const newweb = "https://example.org/";
    const tx = await ap.setWebsite(newweb);
    const web = await ap._website();
    assert.equal(newweb, web, "Should be equal.");
  });

  it("Can create a project with a name and url", async () => {
    const bayc = await Bayc.deployed();
    const mayc = await Mayc.deployed();
    const warm = await Warm.deployed();
    const ap = await ApeProjects.new(
      bayc.address, mayc.address, warm.address,
      ["owner","name","url"],
      [],
      defaultWebsite
    );

    const keys = await ap.getKeys();
    const numKeys = keys.length;
    assert.equal(numKeys, 3, "Should be 3 keys");

    const isape = await ap.isAnApe(accounts[0]);
    assert.equal(isape, true, "Should be true");

    const createResp = await ap.createProject(["owner", "name", "url"], ["0x1", "ApeProjects", "https://apecoin.com"]);
    assert.equal(createResp.logs.length, 1, "Expected 1 event");
    assert.equal(createResp.logs[0].event, "ProjectCreated", "Expected ProjectCreated");

    const newNum = await ap._numProjects();
    const resp = await ap.getProject(0);
    assert.equal(resp["retkeys"].length, 3, "Should be 3 keys");
    assert.equal(resp["retvals"].length, resp["retkeys"].length, "Should be same number keys and vals");

    const nProjects = await ap._numProjects();
    assert.equal(nProjects.toNumber(), 1, "Should be one project");

    // non-owner tries to edit
    try {
      await ap.editProject(0, "name", "what", {from: accounts[1]});
    } catch (ex) {
      assert.isTrue(ex.message.includes("Not owner"), "unexpected error: " + ex);
    }

    await ap.pause();
    try {
      await ap.createProject(["owner", "name", "url"], [accounts[1], "Something", "https://example.com/"], {from:accounts[1]});
    } catch (ex) {
      assert.isTrue(ex.message.includes("paused"), "unexpected error: " + ex);
    }
    await ap.pause();


    // non-owner create project
    await ap.createProject(["owner", "name", "url"], [accounts[1], "Something", "https://example.com/"], {from:accounts[1]});
    const editResp = await ap.editProject(1, "name", "newp1", {from:accounts[1]});
    assert.equal(editResp.logs.length, 1, "Expected 1 event");
    assert.equal(editResp.logs[0].event, "ProjectEdited", "Wrong event, got " + editResp.logs[0].event);
    assert.equal(editResp.logs[0].args[0], 1, "Expected 1, got id " + editResp.logs[0].args[0]);

    // overwrite owner with another account
    await ap.editProjectOwner(1, accounts[2]);
    await ap.editProject(1, "name", "account2", {from:accounts[2]});

    const p1 = await ap.getProject(1);
    assert.equal(p1["retvals"][1], "account2", "expected new name");

    // original owner tries to edit
    try {
      await ap.editProject(1, "name", "back to owner 1", {from:accounts[1]});
    } catch (ex) {
      assert.isTrue(ex.message.includes("Not owner"), "Expected Not owner");
    }
  });
});
