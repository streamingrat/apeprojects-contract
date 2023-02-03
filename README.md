# ApeProjects-contract
A decentralized database of BAYC and MAYC owner's projects.  This contract uses warm wallets (warm.xyz) so the owner does not have to connect their cold wallet to the contract to create a project.

## Creating/Editing via website:
A website is available at https://apeprojects.info to view the projects and to create/edit a project.


## Creating/Editing via contract:
To use the contract directly:

1. Get the list of required keys: `getKeys()`
   Returns an array of strings: `["owner", "name", "url"]`
2. Construct a corresponding array of values for each key. All are required in the same order `getKeys` returned the keys.
   e.g. vals: `["me", "My Project", "https://example.org/"]`
3. Call `createProject(keys, vals)`
4. An event will be emitted `ProjectCreated(id, creator)` where id is your project ID and creator is the address that can edit the project.

If you need to edit your project call:

    editProject(id, key, value)

using the same wallet used to create the project, passing the key and new value.  If you want to erase a value, pass an empty string.
