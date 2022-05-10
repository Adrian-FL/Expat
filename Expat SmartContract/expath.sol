contract ExpathContract{
    mapping(address => string[]) public userHistory;

    function addHistory(address userAddress, string memory hash) public {
        userHistory[userAddress].push(hash);
    }

    function containsHash(address userAddress, string memory hash) public view returns(bool) {
        string[] memory hashes = userHistory[userAddress];
        for(uint i = 0; i < hashes.length; i++){
            if(keccak256(bytes(hashes[i])) == keccak256(bytes(hash)))
                return true;
        }
        return false;
    }
}