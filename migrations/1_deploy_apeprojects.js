const ApeProjects = artifacts.require("./ApeProjects.sol");
const BAProjects = artifacts.require("./Bayc.sol");
const MAProjects = artifacts.require("./Mayc.sol");
const WarmMock = artifacts.require("./WarmMock.sol");

module.exports = async function(_deployer, _network) {
  if (_network == "development") {
    await _deployer.deploy(WarmMock);
    await _deployer.deploy(BAProjects);
    await _deployer.deploy(MAProjects);
    await _deployer.deploy(
      ApeProjects, BAProjects.address, MAProjects.address, WarmMock.address,
      ["owner","name","url","logo","category","tags","twitter","discord","description"],
      [],
      "https://apeprojects.info/"
    );
  } else {
    _deployer.deploy(ApeProjects,
                     "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
                     "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
                     "0xC3AA9bc72Bd623168860a1e5c6a4530d3D80456c",
                     ["owner","name","url","logo","category","tags","twitter","discord","description"],
                     [],
                     "https://apeprojects.info/"
                    );
  }
};
