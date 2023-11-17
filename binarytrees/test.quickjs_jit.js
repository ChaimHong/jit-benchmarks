/* The Computer Language Benchmarks Game
   https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

   contributed by Léo Sarrazin
   multi thread by Andrey Filatkin
   sequential by Isaac Gouy
*/

import * as std from "std";

class TreeNode {
  constructor(item, left, right) {
    this.item = item;
    this.left = left;
    this.right = right;
  }

  check () {
    if (this.left === null) return this.item;
    return this.item + this.left.check() - this.right.check();
  }
}

function bottomUpTree(item, depth) {
    return depth > 0
        ? new TreeNode(item, bottomUpTree(item * 2 - 1, depth - 1), bottomUpTree(item * 2, depth - 1))
        : new TreeNode(item, null, null);
}

function mainThread(maxDepth) {
    let start = new Date();    

    const stretchDepth = maxDepth + 1;
    const check = bottomUpTree(0, stretchDepth).check();
    console.log(`stretch tree of depth ${stretchDepth}\t check: ${check}`);

    const longLivedTree = bottomUpTree(0, maxDepth);

    for (let depth = 4; depth <= maxDepth; depth += 2) {
        const iterations = 1 << maxDepth - depth + 4;
        work(iterations, depth);
    }

    console.log(`long lived tree of depth ${maxDepth}\t check: ${longLivedTree.check()}`);
    
    let endtime = new Date();
    let costTime = (endtime - start)/1000;
    std.err.puts(`time(${costTime})`);
}

function work(iterations, depth) {
    let check = 0;
    for (let i = 0; i < iterations; i++) {
        check += bottomUpTree(i, depth).check();
        check += bottomUpTree(-i, depth).check();
    }
    console.log(`${iterations * 2}\t trees of depth ${depth}\t check: ${check}`);
}

const maxDepth = parseInt(scriptArgs[1]) || 10;
const times = parseInt(scriptArgs[2]) || 1;

std.err.puts(`started\t${std.getpid()}`);

for (let i = 0; i < times; i++) {
  mainThread(maxDepth);
}
