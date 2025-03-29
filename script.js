const chessboardSize = 8;
const dirs = 4;
const dx = [0, 0, -1, 1],
  dy = [-1, 1, 0, 0];
const infinite = 10000;
const make2DArray = (size, defaultValue) => {
  const arr = new Array(size);
  for (let i = 0; i < size; ++i) {
    arr[i] = new Array(size);
    for (let j = 0; j < size; ++j) {
      arr[i][j] = defaultValue;
    }
  }
  return arr;
};
const isValidPoint = (vertex) => {
  let ok = true;
  if (vertex[0] < 0 || vertex[0] >= chessboardSize) {
    ok = false;
  }
  if (vertex[1] < 0 || vertex[1] >= chessboardSize) {
    ok = false;
  }
  return ok ? true : false;
};
const makeVertex = (x, y) => {
  const vert = [0, 0];
  vert[0] = x;
  vert[1] = y;
  return vert;
};
const areVerticesEqual = (v1, v2) => {
    return (v1[0] === v2[0] && v1[1] === v2[1]);
};
const knightMoves = (start, end) => {
  let queue = [];
  const visited = make2DArray(chessboardSize, 0);
  const dist = make2DArray(chessboardSize, infinite);
  const parent = make2DArray(chessboardSize, null);

  queue.push(start);
  dist[start[0]][start[1]] = 0;
  while (queue.length) {
    let curVertex = queue.shift();
    visited[curVertex[0]][curVertex[1]] = 1;
    for (let i = 0; i < dirs; ++i) {
      let cur = makeVertex(curVertex[0] + 2 * dx[i], curVertex[1] + 2 * dy[i]);
      let moves = [];
      if (dx[i] == 0) {
        let move1 = makeVertex(cur[0] + 1, cur[1]);
        let move2 = makeVertex(cur[0] - 1, cur[1]);
        if (isValidPoint(move1)) {
          moves.push(move1);
        }
        if (isValidPoint(move2)) {
          moves.push(move2);
        }
      } else {
        let move1 = makeVertex(cur[0], cur[1] + 1);
        let move2 = makeVertex(cur[0], cur[1] - 1);
        if (isValidPoint(move1)) {
          moves.push(move1);
        }
        if (isValidPoint(move2)) {
          moves.push(move2);
        }
      }
      for (let move of moves) {
        const newDist = Math.min(
          dist[move[0]][move[1]],
          dist[curVertex[0]][curVertex[1]] + 1
        );
        if (newDist < dist[move[0]][move[1]]) {
            dist[move[0]][move[1]] = newDist;
            parent[move[0]][move[1]] = curVertex;
        }
        if (!visited[move[0]][move[1]]) {
          queue.push(move);
        }
      }
    }
  }
  console.log(dist[end[0]][end[1]]);

  const steps = dist[end[0]][end[1]]; 
  if (steps == infinite) {
    console.log("The given destination is unreachable");
  } else {
    console.log(`You made it in ${steps} moves!  Here's your path:`);
    let cur = end;
    let path = [];
    while (cur != start) {    
        path.push(cur);
        if (areVerticesEqual(cur, start)) {
            break;
        }
        cur = parent[cur[0]][cur[1]];
    }
    path.push(start);

    path.reverse();

    let result = ``;
    for (let i = 0; i < path.length; ++i) {
        result += `[${path[i][0]},${path[i][1]}] \n`;
    }
    return result;
    // return path;
    // while (path.length) {
    //     let move = path.pop();
    //     console.log(`[${move[0]},${move[1]}]`);
    // }
  }
};

let path = knightMoves([7,7],[0,0]);
console.log(path);
