import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
    //블록을 받아주는 static 클래스를 하나 더 만들어준다.
    //리턴값은 boolean인데 들어온 블록 구조가 유효한지를 판단.

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
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
  //block structure부분이 생성되었다.
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);
//블록을 생성함.
let blockchain: Block[] = [genesisBlock];
//생성한 블록을 연결함.
const getBlockchain = (): Block[] => blockchain;
//블록 배열을 리턴 / 블록을 추가해서 연결함.
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
//블록체인 안에서 가장 최근것의 한개의 블록 길이를 알수있다.
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
//number 속성
const createNewBlock = (data: string): Block => {
    //함수를 만들어준다.
    //data속성을 쓰고 , 나에게 블록을 리턴해준다.
  const previousBlock: Block = getLatestBlock();
  //새로운 인덱스를 가져온다.
  const newIndex: number = previousBlock.index + 1;
  //이전 블록 인덱스는 1이고 따라서 2가된다.
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  //블록해쉬는 인덱스가 필요함.
  const newBlock: Block = new Block(
    //새로운 블록과 새로운 인덱스를 준다.
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  //새로운 블록을 만들때 newBlock이라고 한다. 
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
//블록의 hash를 얻는 함수
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );
  

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    //구조가 유효한지 체크하기위한 함수이다.
    //똑같은 타입으로 블록을 삽입하고 boolean타입함수를 리턴해준다.
    if (!Block.validateStructure(candidateBlock)) {
    //일단 블록이 유효하면 구조를 검증하고,
    return false;
    //유효하지않으면 거짓.
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        //따로 해쉬를 계산해서 들어온 블록의 해쉬가 실제로 있는지 체크.
        //해쉬를 계산했는데 다른 해쉬를 가지고있다면 리턴 거짓
        //블록의 해쉬를 얻으면 cadidate블록이고,
        //우리가 얻은 해쉬가 candidate와 같지않으면 false 구조는 유효하지않다.
    return false;    
    } else return true;
};

const addBlock = (candidateBlock: Block): void => {
    //이제 블록체인에 블록을 추가한다.
    //addBlock을 createNewBlock 함수에 연결한다.
    //여기서 candidate블록을 얻고, 
    //아무것도 리턴하지않는다.
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    //체크 isBlockValid함수를 실행하여 참이면
    blockchain.push(candidateBlock);
    //candidateBlock을 추가해준다.
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};