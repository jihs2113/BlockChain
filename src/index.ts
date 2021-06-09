class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number

    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    //block structure부분이 생성되었다.
}

const genesisBlock: Block = new Block(0, "231232323", "", "Hello", 123456);


let blockchain: [Block] = [genesisBlock];

console.log(blockchain);


export{};