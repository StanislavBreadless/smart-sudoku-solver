import { solve } from './solver-main'

onmessage = (e) => {
  const result = solve(e.data);

  postMessage(result);
}