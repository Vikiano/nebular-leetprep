// Static 3-tier fallback explanations for seeded problems.
// Served when ANTHROPIC_API_KEY is unset or Anthropic is unavailable so that
// the AI Tutor experience is always functional for the demo.
//
// These are authored by Nebular Labs. The content is intentionally concrete
// and self-contained so a visitor can learn the pattern without network calls.
//
// All strings use double-quote delimiters with explicit \n because the bodies
// contain backticks (inline code fences and markdown code blocks) which would
// collide with template-literal delimiters.

export type ExplainLevel = "eli5" | "intermediate" | "expert";

type TieredExplanation = Record<ExplainLevel, string>;

// Generic per-pattern fallbacks keyed by the topic tags on the problems table.
// When a problem has no specific static entry, we pick the first matching
// topic tag and serve that pattern's explanation.
const PATTERN_FALLBACKS: Record<string, TieredExplanation> = {
  array: {
    eli5:
      "## The array pattern, in plain language\n\n" +
      "Think of an array like a row of numbered lockers. You can open locker 0, locker 1, locker 2, and so on. Each locker holds one thing. Because the lockers are in a row and numbered, you can jump to any one of them instantly if you know its number.\n\n" +
      "### The core idea\n\n" +
      "Most array interview questions ask: given this row of lockers, find something, count something, or rearrange something. The trick is usually to avoid opening every locker twice. One pass is better than two. Two pointers or a running total beats a nested loop.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Suppose the lockers contain the numbers [3, 1, 4, 1, 5, 9, 2, 6]. If someone asks what is the sum, you do not need anything clever. Just walk the row, add as you go. Time is O(n), which means one step per locker.\n\n" +
      "If someone asks to find two lockers whose contents add up to 10, the beginner instinct is a double loop. Better: as you walk, remember every number you have seen in a lookup. At each locker, check have I already seen 10 minus this number in my lookup. That turns O(n^2) into O(n).\n\n" +
      "### Takeaway\n\n" +
      "Arrays reward single-pass thinking. Before coding, ask: can I maintain a running value, a running set, or two pointers as I walk? If yes, you probably do not need the nested loop.",
    intermediate:
      "## Pattern: array traversal with auxiliary state\n\n" +
      "Key insight: most array problems reduce to one of: prefix sum, sliding window, two pointers, or hash-of-seen-values.\n\n" +
      "### Algorithm template\n\n" +
      "1. Identify what needs to be tracked as you scan left-to-right: running sum, running min/max, frequency map, or start/end of a window.\n" +
      "2. Decide the window-grow and window-shrink condition, or the hash-query condition.\n" +
      "3. Walk the array exactly once, O(n) time, O(k) auxiliary space where k is small.\n\n" +
      "### Common mistakes\n\n" +
      "- Using nested loops when a hash-of-seen-values would make it O(n).\n" +
      "- Forgetting to handle the empty array or single-element edge case.\n" +
      "- Off-by-one errors when shrinking a sliding window.\n\n" +
      "### Complexity\n\n" +
      "Target: O(n) time, O(1) or O(k) space. If your solution is O(n^2), you are likely missing an auxiliary structure.",
    expert:
      "## Expert framing\n\n" +
      "Classify the problem along two axes. First: is the answer a count, a subarray, an index-pair, or a transformed array? Second: is the invariant I need to maintain monotonic (two pointers), additive (prefix sum), or frequency-dependent (hash map)?\n\n" +
      "### Tradeoffs\n\n" +
      "- Two pointers: O(n) time, O(1) space, requires a monotonic invariant. Breaks if the array is unsorted and the invariant depends on order.\n" +
      "- Prefix sum: O(n) time, O(n) space precompute, O(1) per range query. Use when you need many range-sum queries.\n" +
      "- Sliding window: O(n) amortized, O(k) space for window state. Use when the window grows and shrinks with a clear trigger.\n" +
      "- Hash of seen: O(n) time, O(n) space, perfect for pair-sum, subarray-sum-equals-k, and variants.\n\n" +
      "### Related problems\n\n" +
      "- Two Sum, Subarray Sum Equals K, Longest Substring Without Repeating Characters, Container With Most Water, Trapping Rain Water.\n\n" +
      "### When to reach for DP instead\n\n" +
      "If the answer at index i depends on the best answer among indices 0..i-1 and cannot be expressed as a running scalar, you need DP, not a scan.",
  },
  string: {
    eli5:
      "## Strings are arrays of characters\n\n" +
      "A string is the same thing as an array where every locker holds one letter instead of one number. The same tricks apply: walk left to right, track something as you go, and try not to start over.\n\n" +
      "### The core idea\n\n" +
      "Most string problems fall into a few groups. Looking for patterns (does this string contain that one?). Counting frequencies (are these two strings anagrams?). Shortening or expanding (what is the longest substring without repeats?). Almost every one of these uses either a sliding window or a character-frequency map.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Take the problem find the longest substring without repeating characters on the word abcabcbb. Put two fingers on the string, left and right. Move the right finger forward, one letter at a time. Keep a set of letters currently between your fingers. If the new letter is already in the set, move your left finger forward until it is not. Track the maximum distance between your fingers. That is the answer. For abcabcbb the answer is 3 (the substring abc).\n\n" +
      "### Takeaway\n\n" +
      "Two fingers sliding in the same direction solves more string problems than you would expect. The set (or frequency map) between them is the state that makes it work.",
    intermediate:
      "## Pattern: sliding window over characters with frequency state\n\n" +
      "### Key insight\n\n" +
      "For longest or shortest substring with property P, maintain a window [L, R] and a state object (set, counter, or integer) that tells you whether property P holds. Move R forward; when P breaks, move L forward until it holds again.\n\n" +
      "### Algorithm\n\n" +
      "1. Initialize L = 0, right iterates R = 0 to n-1.\n" +
      "2. On each R, add s[R] to the window state.\n" +
      "3. While property P fails, remove s[L] from the state and increment L.\n" +
      "4. Update the best answer each iteration.\n\n" +
      "### Common mistakes\n\n" +
      "- Using a Set when you need a Counter (fails when the same char appears multiple times in the window).\n" +
      "- Forgetting to decrement the frequency to zero before removing from the map, which leaves stale keys.\n" +
      "- Confusing contiguous substring with subsequence.\n\n" +
      "### Complexity\n\n" +
      "O(n) amortized because each character enters and exits the window at most once.",
    expert:
      "## Expert framing\n\n" +
      "String problems bifurcate. Either the answer is a single substring (sliding window), or the answer involves comparing strings or aligning them (dynamic programming on an (i, j) grid), or transforming via reversal or rotation (palindromes, KMP, suffix structures).\n\n" +
      "### Three archetypes with signature\n\n" +
      "- Sliding window: O(n) time, O(sigma) space where sigma is alphabet size. Triggers: longest or shortest substring with property.\n" +
      "- DP on two strings: O(n*m) time, O(min(n,m)) space with rolling array. Triggers: edit distance, LCS, regex match.\n" +
      "- KMP or Z-algorithm: O(n+m) time, O(m) space. Triggers: substring search with pattern preprocessing.\n\n" +
      "### Tradeoffs\n\n" +
      "Sliding window loses when the window-state is non-monotonic (longest substring with exactly k distinct is harder than at most k; handle via difference of two sliding windows).\n\n" +
      "DP on strings gives correct answers but costs O(n*m). If n and m are large (over 10,000), look for a greedy or suffix-automaton approach.\n\n" +
      "### Related\n\n" +
      "- Longest Palindromic Substring, Minimum Window Substring, Edit Distance, Regular Expression Matching, Longest Common Subsequence.",
  },
  tree: {
    eli5:
      "## Trees are upside-down family trees\n\n" +
      "A tree starts at the root (the oldest ancestor). Each node (person) has zero or more children. In interview problems trees are usually binary, meaning each person has at most two children: left and right.\n\n" +
      "### The core idea\n\n" +
      "Most tree problems are solved by recursion. You ask a simple question like how deep is this tree, and the answer is one more than the deeper of the two children. You write this as a function that calls itself on the children.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Problem: find the maximum depth of a binary tree.\n\n" +
      "Pseudocode: if the node is null, return 0. Otherwise, return 1 plus the max of maxDepth(node.left) and maxDepth(node.right).\n\n" +
      "Read it as English: an empty tree has depth 0. Any other tree has depth one more than its deeper child.\n\n" +
      "### Takeaway\n\n" +
      "Define the answer for the subtree recursively in terms of the answer for each child. The base case is usually the empty tree. The merge step depends on the problem (sum, max, list concat, etc.).",
    intermediate:
      "## Pattern: recursive post-order traversal with merge step\n\n" +
      "### Key insight\n\n" +
      "Tree interview problems almost always decompose as: compute the answer on the left subtree, compute the answer on the right subtree, then combine those two answers (possibly with the current node value) into the answer for the whole subtree.\n\n" +
      "### Algorithm template\n\n" +
      "function solve(node):\n  if node is null, return baseCase\n  leftResult = solve(node.left)\n  rightResult = solve(node.right)\n  return merge(leftResult, rightResult, node.val)\n\n" +
      "### Common mistakes\n\n" +
      "- Mutating a shared state without understanding the recursion order.\n" +
      "- Forgetting the null-check and throwing on leaf children.\n" +
      "- Using BFS when post-order DFS is natural (deeper is wider in terms of what you need to know first).\n\n" +
      "### Complexity\n\n" +
      "O(n) time since each node is visited once. O(h) space for the call stack, where h is tree height. Balanced tree: O(log n). Degenerate: O(n).",
    expert:
      "## Expert framing\n\n" +
      "Classify by traversal order needed.\n\n" +
      "- Pre-order (root, left, right): serialization, tree construction from traversals, problems where parent is decided before children.\n" +
      "- In-order (left, root, right): binary search tree validation, kth smallest, since it yields sorted order on a BST.\n" +
      "- Post-order (left, right, root): aggregation from leaves upward, diameter, path sum, balanced check.\n" +
      "- Level-order (BFS): shortest path from root to leaf, minimum depth, views (right-side view, level averages).\n\n" +
      "### Tradeoffs\n\n" +
      "Morris traversal gives O(1) space but is rarely required in interviews. Iterative stack-based DFS is cleaner than recursion for huge trees to avoid stack overflow.\n\n" +
      "### Related\n\n" +
      "- Serialize and Deserialize Binary Tree, Binary Tree Maximum Path Sum, Lowest Common Ancestor, Kth Smallest Element in a BST, Diameter of Binary Tree.\n\n" +
      "### When to flatten to an array\n\n" +
      "If the problem reduces to an ordered operation (kth element, range sum), flatten the tree via in-order traversal once, then solve on the array.",
  },
  graph: {
    eli5:
      "## Graphs are maps of connections\n\n" +
      "Picture a subway map. Each station is a node. Each track is an edge. A graph is just that: things connected to other things. Unlike a tree, a graph can have cycles (you can loop back to where you started).\n\n" +
      "### The core idea\n\n" +
      "Graph problems boil down to: explore the map in a smart order. Two main ways.\n\n" +
      "- BFS (breadth-first search): explore all stations one stop away, then two stops away, and so on. Good for shortest path when every track has the same cost.\n" +
      "- DFS (depth-first search): follow one route as far as you can, then back up and try another. Good for detecting cycles, counting components, topological sort.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Problem: number of islands. The grid is a graph where each cell is a node and each cell connects to its 4 neighbors if they share a land value. Walk the grid. When you find an unvisited land cell, that is a new island. Mark every connected land cell as visited (DFS or BFS). Increment the island count. Keep walking.\n\n" +
      "### Takeaway\n\n" +
      "BFS for shortest-path-in-hops. DFS for reach everything from here. Both need a visited set so you do not loop forever.",
    intermediate:
      "## Pattern: BFS or DFS with visited set\n\n" +
      "### Key insight\n\n" +
      "Almost every graph question is: traverse from a start node, possibly many start nodes, and compute something along the way. The choice between BFS and DFS depends on the question, not the graph.\n\n" +
      "- Shortest distance (unweighted): BFS, because the first time you reach a node, it is the shortest number of hops.\n" +
      "- Connectivity (are these two connected?): either BFS or DFS.\n" +
      "- Cycle detection in directed graph: DFS with three colors (white, gray, black).\n" +
      "- Topological sort: DFS with post-order stack, or Kahn in-degree BFS.\n" +
      "- Shortest distance (weighted, non-negative): Dijkstra, a BFS variant with a priority queue.\n\n" +
      "### Algorithm skeleton\n\n" +
      "visited = new Set()\nqueue = [start]\nwhile queue not empty:\n  node = queue.dequeue()\n  if node in visited continue\n  visited.add(node)\n  process(node)\n  for neighbor in graph[node]:\n    if neighbor not in visited: queue.enqueue(neighbor)\n\n" +
      "### Common mistakes\n\n" +
      "- Missing the visited check and looping forever on cyclic graphs.\n" +
      "- Using DFS when BFS would give the shortest path, or vice versa.\n" +
      "- Not handling disconnected components (wrap the outer traversal in a for loop over every node).\n\n" +
      "### Complexity\n\n" +
      "O(V + E) for both BFS and DFS.",
    expert:
      "## Expert framing\n\n" +
      "Graph problems split along three axes: directed vs undirected, weighted vs unweighted, cyclic-possible vs DAG-guaranteed.\n\n" +
      "### Algorithm selection\n\n" +
      "- Unweighted shortest path: BFS, O(V+E).\n" +
      "- Non-negative weighted shortest path: Dijkstra, O((V+E) log V) with binary heap.\n" +
      "- Negative weights present: Bellman-Ford, O(V*E). Can detect negative cycles.\n" +
      "- All-pairs shortest: Floyd-Warshall, O(V^3), dense graphs.\n" +
      "- Minimum spanning tree: Kruskal (sort edges, union-find) or Prim (heap-based like Dijkstra).\n" +
      "- Cycle detection in directed: DFS with recursion stack. In undirected: Union-Find or DFS tracking parent.\n" +
      "- Strongly connected components: Tarjan or Kosaraju.\n" +
      "- Topological sort: Kahn O(V+E), requires DAG.\n\n" +
      "### Tradeoffs\n\n" +
      "Union-Find beats DFS for incremental connectivity queries. Dijkstra beats BFS only when edge weights differ; on unit-weight graphs, BFS is simpler and equally fast.\n\n" +
      "### Related\n\n" +
      "- Course Schedule (topo sort), Network Delay Time (Dijkstra), Number of Islands (BFS/DFS on grid), Word Ladder (BFS on implicit graph), Alien Dictionary (topo sort).\n\n" +
      "### Implicit graphs\n\n" +
      "Many problems use a graph without storing one: grid-based BFS, state-space BFS, string transformations. Recognize these by asking can this state become that state in one step.",
  },
  dp: {
    eli5:
      "## Dynamic programming, demystified\n\n" +
      "DP sounds intimidating. It is not. It is just remember answers to subproblems so you do not solve them again.\n\n" +
      "### The core idea\n\n" +
      "Some problems have a recursive structure where the same sub-question shows up many times. The Fibonacci sequence is the classic example: fib(5) = fib(4) + fib(3), and fib(4) = fib(3) + fib(2), so fib(3) gets computed twice. If you remember fib(3), you save work.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Problem: climb stairs. There are n stairs. You can take 1 step or 2 steps. How many distinct ways to reach the top?\n\n" +
      "Think: to reach step n, you either came from step n-1 (1 step) or from step n-2 (2 steps). So ways(n) = ways(n-1) + ways(n-2). Base: ways(0) = 1, ways(1) = 1.\n\n" +
      "With memoization, you compute each ways(k) exactly once. Without, you recompute exponentially.\n\n" +
      "### Takeaway\n\n" +
      "DP is recursion plus a cache. First write the recursion. Then ask does my recursion see the same arguments more than once. If yes, cache the result.",
    intermediate:
      "## Pattern: recurrence plus memoization (or tabulation)\n\n" +
      "### Key insight\n\n" +
      "DP applies when: (a) the problem has optimal substructure (best answer equals some function of best answers to subproblems), and (b) the subproblems overlap (you compute the same one multiple times in naive recursion).\n\n" +
      "### Approach\n\n" +
      "1. Define dp[state] clearly. What does it mean? What is the domain of state?\n" +
      "2. Write the recurrence: dp[state] = f(dp[smaller-state]).\n" +
      "3. Identify base cases.\n" +
      "4. Decide top-down (memoized recursion) or bottom-up (tabulation). Top-down is easier to write; bottom-up saves stack space.\n" +
      "5. Consider space optimization: if dp[i] only depends on dp[i-1] and dp[i-2], you only need two variables, not a full array.\n\n" +
      "### Common mistakes\n\n" +
      "- Missing a dimension in the state definition. Ask: does the answer depend on anything other than i?\n" +
      "- Off-by-one on the base case.\n" +
      "- Double-counting vs single-counting in the recurrence.\n\n" +
      "### Complexity\n\n" +
      "O(number of states * transition cost per state).",
    expert:
      "## Expert framing\n\n" +
      "DP categories map roughly to state-shape.\n\n" +
      "- 1D DP: dp[i] depends on dp[i-1], dp[i-2], etc. Classic: climb stairs, house robber, maximum subarray.\n" +
      "- 2D DP on (i, j): two sequences or a grid. Classic: longest common subsequence, edit distance, unique paths.\n" +
      "- Interval DP: dp[i][j] is the answer on subinterval [i..j]. Classic: matrix chain multiplication, palindrome partitioning.\n" +
      "- Subset or bitmask DP: dp[mask] where mask is a bitmask of which items are used. O(2^n * n). Classic: TSP approximations, count-set-partitions.\n" +
      "- Tree DP: dp[node] = f(dp[children]). Classic: house robber III, diameter.\n" +
      "- Digit DP: for counting numbers with property in a range.\n\n" +
      "### Optimization techniques\n\n" +
      "- Rolling array: when dp[i] only needs dp[i-1], reduce from O(n) to O(1) space.\n" +
      "- Monotonic queue or stack: sometimes the transition has a min or max over a range that you can maintain incrementally.\n" +
      "- Convex hull trick or Knuth optimization: specific recurrences admit O(n log n) or O(n) speedup.\n\n" +
      "### Tradeoffs\n\n" +
      "Memoization is easier to code but costs O(states) recursion stack. Tabulation is faster in practice but requires thinking about evaluation order.\n\n" +
      "### Related\n\n" +
      "- Longest Increasing Subsequence (O(n log n) via patience sorting), Coin Change, Best Time to Buy and Sell Stock with Cooldown, Partition Equal Subset Sum, Word Break.",
  },
  heap: {
    eli5:
      "## A heap keeps the biggest (or smallest) on top\n\n" +
      "Imagine a pile of snow shaped like a pyramid. The tallest point is always visible. If you add a new snowball, the pyramid rearranges so the tallest stays on top. If you take the top off, the next-tallest rises.\n\n" +
      "A heap does this for numbers. Min-heap keeps the smallest on top. Max-heap keeps the largest on top. Add and remove cost O(log n). Peeking at the top is O(1).\n\n" +
      "### A concrete walkthrough\n\n" +
      "Problem: find the k-th largest element in an unsorted array.\n\n" +
      "Maintain a min-heap of size k. Scan the array. For each number, push it onto the heap. If the heap size exceeds k, pop the smallest. At the end, the top of the heap is the k-th largest overall.\n\n" +
      "### Takeaway\n\n" +
      "Heaps are the answer whenever you ask what is the best or worst among what I have seen so far and you need it repeatedly as new data streams in.",
    intermediate:
      "## Pattern: running min or max, or top-k with a priority queue\n\n" +
      "### Key insight\n\n" +
      "When a problem says at each step I need the smallest (or largest) of a changing set, use a heap. O(log n) insert and remove beats O(n) scan.\n\n" +
      "### Use cases\n\n" +
      "- Top-k problems: kth largest, top-k frequent elements.\n" +
      "- Merge k sorted lists: push the head of each list, repeatedly pop min.\n" +
      "- Scheduling or task dispatch: process the earliest-deadline-next job.\n" +
      "- Running median: two heaps (max-heap for the lower half, min-heap for the upper half, balance sizes).\n\n" +
      "### Common mistakes\n\n" +
      "- Using a heap when a sort would do. If you need every element in order exactly once, just sort.\n" +
      "- Forgetting that JavaScript has no built-in priority queue; implement one or pull a library.\n" +
      "- Comparing wrong field: heap by frequency when you meant heap by value.\n\n" +
      "### Complexity\n\n" +
      "O(log n) per insert or pop. O(n log k) for top-k where k is small.",
    expert:
      "## Expert framing\n\n" +
      "Heaps shine in three scenarios.\n\n" +
      "1. Top-k with k much smaller than n: maintain a heap of size k, total time O(n log k), space O(k).\n" +
      "2. Streaming median: two heaps, O(log n) per insert, O(1) median query.\n" +
      "3. Dijkstra or Prim: heap of candidates, O(E log V).\n\n" +
      "### Tradeoffs\n\n" +
      "- Heap: O(log n) insert and pop. No random access.\n" +
      "- Balanced BST (Java TreeMap, not native in JS or Python): O(log n) for insert, pop, and lookup including random access. Use when you need to remove an arbitrary element, not just the top.\n" +
      "- Sorted container: O(log n) insert, O(1) access to any rank. Use when you need the 3rd smallest and the median both.\n\n" +
      "### Variants\n\n" +
      "- Indexed, Fibonacci, pairing heaps: theoretical improvements, rarely relevant in interviews.\n" +
      "- Lazy deletion: push a sentinel and skip on pop. Simpler than implementing decrease-key.\n\n" +
      "### Related\n\n" +
      "- K Closest Points to Origin, Find Median from Data Stream, Merge K Sorted Lists, Top K Frequent Elements, Sliding Window Maximum (monotonic deque beats heap here).",
  },
  backtracking: {
    eli5:
      "## Backtracking is disciplined trial and error\n\n" +
      "You try a choice. If it leads to a dead end, you undo it and try the next. Like solving a maze: step forward; if you hit a wall, step back; try another direction.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Problem: letter combinations of a phone number.\n\n" +
      "Digit 2 maps to a, b, c. Digit 3 maps to d, e, f. For input 23, there are 9 combinations: ad, ae, af, bd, be, bf, cd, ce, cf.\n\n" +
      "Recursively build a combination. At each step, for the current digit, pick one letter, recurse on the next digit, then undo the pick and try the next letter.\n\n" +
      "### Takeaway\n\n" +
      "Backtracking solves problems where the answer is a sequence of choices and you want either all valid sequences, the count, or the best one. The discipline is: pick, recurse, unpick.",
    intermediate:
      "## Pattern: recursive choose, recurse, unchoose\n\n" +
      "### Algorithm template\n\n" +
      "function backtrack(state, choiceIndex):\n  if isComplete(state): record(state); return\n  for choice in choicesAt(choiceIndex):\n    if not isValid(state, choice): continue\n    apply(state, choice)\n    backtrack(state, choiceIndex + 1)\n    undo(state, choice)\n\n" +
      "### Three canonical shapes\n\n" +
      "- Permutations: n factorial sequences. Swap-in-place or visited-array.\n" +
      "- Combinations or subsets: 2^n groupings. Include-or-exclude at each index.\n" +
      "- Partitions or splits: place walls between characters.\n\n" +
      "### Common mistakes\n\n" +
      "- Mutating the same object and pushing it to results without copying.\n" +
      "- Forgetting to undo the mutation after recursing (leaks state between branches).\n" +
      "- Not pruning invalid branches early (turns into brute force).\n\n" +
      "### Complexity\n\n" +
      "Exponential: O(branches ^ depth). Pruning is the only way to tame it.",
    expert:
      "## Expert framing\n\n" +
      "Backtracking is the right choice when the search space is structured (tree of partial solutions) and pruning is cheap relative to state size.\n\n" +
      "### Pruning techniques\n\n" +
      "- Feasibility: test isValid before recursing. Reject partial solutions that cannot be extended.\n" +
      "- Optimality bound: branch-and-bound; skip branches whose best-case result is worse than the best known.\n" +
      "- Symmetry breaking: force canonical order to avoid duplicate permutations (for example always pick smaller index first for combinations).\n" +
      "- Memoization across branches: if two branches enter the same state, cache the answer.\n\n" +
      "### When NOT to backtrack\n\n" +
      "- DP is available: if subproblems repeat (not just the search tree), DP beats backtracking.\n" +
      "- Greedy suffices: some problems admit a greedy proof (activity selection, Huffman coding).\n" +
      "- Problem is actually a graph search: BFS or DFS with visited set is cleaner than ad-hoc backtracking.\n\n" +
      "### Related\n\n" +
      "- N-Queens, Sudoku Solver, Word Search, Generate Parentheses, Combination Sum, Restore IP Addresses, Letter Combinations of a Phone Number.\n\n" +
      "### Implementation note\n\n" +
      "For problems with expensive deepcopy, prefer in-place mutation plus undo. For simple problems (such as subsets of small arrays), concatenation (spread the prefix with the next element) is cleaner and still O(n) per recursion.",
  },
  "sliding-window": {
    eli5:
      "## Two fingers moving together\n\n" +
      "Put a finger on the left edge of an array or string, another on the right. Slide the right finger forward, tracking some property of what is between your fingers. When the property breaks, slide the left finger forward until it is fixed.\n\n" +
      "That is the sliding window. Both fingers only move forward, so the total work is O(n) even though you are tracking a window of variable size.\n\n" +
      "### A concrete walkthrough\n\n" +
      "Problem: longest substring with at most k distinct characters, k = 2, string = eceba.\n\n" +
      "- L=0, R=0: window = e, distinct=1. OK.\n" +
      "- L=0, R=1: window = ec, distinct=2. OK. Best=2.\n" +
      "- L=0, R=2: window = ece, distinct=2. OK. Best=3.\n" +
      "- L=0, R=3: window = eceb, distinct=3. Shrink. Move L forward until distinct is at most 2. L becomes 2, window = eb.\n" +
      "- L=2, R=4: window = eba, distinct=3. Shrink again. L becomes 3, window = ba.\n\n" +
      "Best = 3. Done.\n\n" +
      "### Takeaway\n\n" +
      "The window is a dynamic interval. The state between your fingers updates incrementally. Never re-scan the middle; just add the new right end, remove the old left end.",
    intermediate:
      "## Pattern: two-pointer window with incremental state\n\n" +
      "### Key insight\n\n" +
      "Applies when the question is longest or shortest contiguous segment with property P. The window-state (frequency map, distinct-count, sum) is maintained incrementally as R advances and L trails.\n\n" +
      "### Algorithm\n\n" +
      "L = 0; state = empty\nfor R in 0..n-1:\n  state.add(arr[R])\n  while not propertyHolds(state):\n    state.remove(arr[L]); L += 1\n  best = max(best, R - L + 1)\n\n" +
      "### Common mistakes\n\n" +
      "- For at most k distinct, remember to decrement the frequency AND remove from the map when count reaches zero.\n" +
      "- For exactly k distinct, compute at most k minus at most k-1 (two sliding windows).\n" +
      "- For substrings that can contain or be contained, be sure you handle both L advance and R advance.\n\n" +
      "### Complexity\n\n" +
      "O(n) amortized. Each element enters the window once (R) and leaves once (L).",
    expert:
      "## Expert framing\n\n" +
      "Sliding window is a specialization of two-pointer. The window-state must satisfy: adding an element is O(state-update-cost), removing is O(state-update-cost), checking propertyHolds is O(1) or O(alphabet).\n\n" +
      "### Variants\n\n" +
      "- Fixed-size window: R - L = k always. Common for average of k or max sum of k-length window.\n" +
      "- Variable-size window (shrink while invalid): covered above.\n" +
      "- Variable-size window (grow-until-satisfied then shrink for optimality): used for minimum-window-substring. Once valid, try shrinking from L before advancing R.\n" +
      "- Circular window: handle wrap-around via doubling the array.\n\n" +
      "### When sliding window fails\n\n" +
      "- State removal is not O(1) or is ambiguous (for example longest window with bitwise-XOR zero needs prefix-XOR plus hash, not sliding window).\n" +
      "- Property is not monotone: adding an element might restore validity that was broken by a previous removal. Rare but real.\n\n" +
      "### Tradeoffs\n\n" +
      "When alphabet is large, use a HashMap. When alphabet is small (lowercase letters), use a 26-element array for constant factor speedup.\n\n" +
      "### Related\n\n" +
      "- Minimum Window Substring, Longest Substring with At Most K Distinct Characters, Permutation in String, Max Consecutive Ones, Subarrays with K Different Integers, Fruit Into Baskets.",
  },
};

// Explicit per-slug overrides for high-value problems.
const SLUG_FALLBACKS: Record<string, TieredExplanation> = {
  "two-sum": {
    eli5:
      "## Two Sum, explained like you have never seen it\n\n" +
      "You have a row of numbers. Someone tells you a target number. Your job: find two positions whose numbers add up to the target.\n\n" +
      "### Slow way\n\n" +
      "Try every pair. For each number, look at every other number to its right. Check if they sum to target. If yes, return those two positions. This is O(n^2): for 1000 numbers, 1,000,000 checks.\n\n" +
      "### Fast way\n\n" +
      "As you walk the row, keep a notebook of numbers you have already seen and the position each was at. At each new number, look up target minus my current number in the notebook. If it is there, you have found the pair.\n\n" +
      "### Concrete walkthrough\n\n" +
      "Array = [2, 7, 11, 15], target = 9.\n\n" +
      "- Position 0: number 2. Need 7. Notebook is empty. Add 2 -> 0.\n" +
      "- Position 1: number 7. Need 2. Notebook has 2 at position 0. Found. Return [0, 1].\n\n" +
      "One pass, O(n), done.\n\n" +
      "### Takeaway\n\n" +
      "Hash-of-seen-values is the single most common trick in array interviews. Any time you want is this other value present in what I have walked already, reach for a Map.",
    intermediate:
      "## Pattern: hash map of value-to-index, one pass\n\n" +
      "### Key insight\n\n" +
      "For each element, the question does the array contain (target minus element) can be answered in O(1) if you have stored every element seen so far keyed by value. Walk left-to-right; after checking, insert.\n\n" +
      "### Algorithm\n\n" +
      "seen = new Map()\nfor (i, x) in enumerate(nums):\n  need = target - x\n  if seen.has(need): return [seen.get(need), i]\n  seen.set(x, i)\n\n" +
      "### Common mistakes\n\n" +
      "- Inserting before checking, which causes a number to pair with itself when the target is 2x (for example target = 6, nums = [3, 3]).\n" +
      "- Returning values instead of indices.\n" +
      "- Forgetting the problem guarantees exactly one solution, so no need to continue after finding the pair.\n\n" +
      "### Complexity\n\n" +
      "O(n) time. O(n) space for the hash map.\n\n" +
      "### Follow-up\n\n" +
      "If the array is sorted, you can use two pointers (left, right) converging in O(n) time and O(1) space. Sort-first solutions cost O(n log n) which is worse than the hash approach.",
    expert:
      "## Expert analysis\n\n" +
      "Two Sum is the prototype for hash-of-seen which generalizes to Subarray Sum Equals K (hash of prefix sums), Longest Substring Without Repeating Characters (hash of last-seen-index), and many others.\n\n" +
      "### Complexity\n\n" +
      "Hash: O(n) time expected, O(n) space. Worst-case hash collisions make it O(n^2) theoretically; in interview answers assume average case.\n\n" +
      "Two-pointer on sorted array: O(n log n) for sort plus O(n) scan. Better space at O(1) but worse time if the array is unsorted.\n\n" +
      "### Variants and their tricks\n\n" +
      "- Two Sum II (sorted input): two pointers converging.\n" +
      "- 3Sum: fix one pointer, Two Sum on the remaining. Dedupe carefully. O(n^2).\n" +
      "- 4Sum: two pointers plus outer O(n^2) loop. Or hash of pair-sums for O(n^2) average.\n" +
      "- Two Sum III (data structure design): trade insert speed for query speed.\n" +
      "- Two Sum IV (BST input): in-order traversal to array, then two pointers. Or a hash as you traverse.\n\n" +
      "### Why this is a staple\n\n" +
      "Two Sum tests whether a candidate immediately reaches for the right data structure. Quadratic answers are accepted only as a warm-up; interviewers expect O(n) within the first few minutes.",
  },
  "letter-combinations-phone": {
    eli5:
      "## Letter Combinations of a Phone Number, explained simply\n\n" +
      "Old flip phones had a keypad where each number key maps to a few letters. 2 to abc, 3 to def, 4 to ghi, 5 to jkl, 6 to mno, 7 to pqrs, 8 to tuv, 9 to wxyz.\n\n" +
      "When someone types a string of digits, each digit offers a small alphabet. Every complete word you can spell has one letter per digit. If the input has 3 digits and each digit offers 3 letters, that is 3 * 3 * 3 = 27 possibilities.\n\n" +
      "### Concrete walkthrough\n\n" +
      "Input: 23. Digit 2 gives a, b, c. Digit 3 gives d, e, f. So the combinations are: ad, ae, af, bd, be, bf, cd, ce, cf. Nine total.\n\n" +
      "### How to generate them\n\n" +
      "Pick a letter from the first digit. Then recursively pick a letter from the second digit. When you have picked one letter per digit, record the built-up string. Then undo the last pick and try another.\n\n" +
      "This is backtracking: pick, recurse, unpick.\n\n" +
      "### Takeaway\n\n" +
      "When the problem says generate all combinations, the shape is almost always backtracking with one recursion level per input position.",
    intermediate:
      "## Pattern: backtracking, one recursion depth per input digit\n\n" +
      "### Key insight\n\n" +
      "The output size is bounded by 4^n where n is the number of digits (digits 7 and 9 have 4 letters). Backtracking is optimal because we must enumerate every valid combination anyway.\n\n" +
      "### Algorithm\n\n" +
      "map = { 2:abc, 3:def, 4:ghi, 5:jkl, 6:mno, 7:pqrs, 8:tuv, 9:wxyz }\nresults = []\nfunction backtrack(i, current):\n  if i == digits.length:\n    results.push(current)\n    return\n  for each letter in map[digits[i]]:\n    backtrack(i + 1, current + letter)\n\n" +
      "### Common mistakes\n\n" +
      "- Forgetting to handle empty input (return empty array, not an array with an empty string).\n" +
      "- Including digit 0 or 1 in the map (they have no letters).\n" +
      "- Rebuilding the prefix string instead of passing it as an argument (works but wastes memory).\n\n" +
      "### Complexity\n\n" +
      "O(4^n * n) time. The 4^n is the output size. The additional n is the cost of copying the string at each leaf.\n\n" +
      "### Space\n\n" +
      "O(n) call stack depth plus O(4^n * n) output.",
    expert:
      "## Expert analysis\n\n" +
      "This problem is an ideal backtracking teaching example because the search tree branches uniformly and every leaf is a valid output.\n\n" +
      "### Implementation variants\n\n" +
      "- Recursive with string concatenation (shown above): simplest, O(n) memory per recursion level wasted.\n" +
      "- Recursive with character array plus undo: 20 percent faster in practice, uses one buffer.\n" +
      "- Iterative BFS: start with an empty-string seed, at each digit take the Cartesian product with its letters. Cleaner for streaming output.\n\n" +
      "### Tradeoffs\n\n" +
      "- Recursion: natural expression of the tree, uses call stack.\n" +
      "- Iteration: lower overhead, but you maintain a queue of partial results.\n\n" +
      "### Related problems\n\n" +
      "- Generate Parentheses (backtracking with feasibility constraint).\n" +
      "- Subsets (include-or-exclude at each position).\n" +
      "- Word Break II (backtracking with DP memo).\n" +
      "- Permutations (swap-in-place backtracking).\n\n" +
      "### Why interviewers love it\n\n" +
      "It tests whether the candidate can (a) recognize backtracking from the phrase all combinations, (b) implement it without bugs, (c) discuss the complexity upper bound, (d) propose the iterative alternative if asked. The whole sequence takes 15 to 20 minutes in a typical onsite.\n\n" +
      "### Trap to watch for\n\n" +
      "Some variants ask for sorted output or skip duplicates. If digits can repeat, some naive backtracks generate duplicates; add a set or sort the output at the end to match the spec.",
  },
  "valid-parentheses": {
    eli5:
      "## Valid Parentheses, the bracket-balancing puzzle\n\n" +
      "You get a string made of brackets: round, curly, square. Tell me if they are balanced and properly nested.\n\n" +
      "Balanced means every open bracket has a matching close. Nested means they close in the reverse order they opened. Square inside round is valid. Square opening after round and round closing before square is not.\n\n" +
      "### The core idea\n\n" +
      "Think of a stack of plates. When you see an open bracket, push a matching close-bracket onto the stack (I am expecting this close later). When you see a close-bracket, check the top of the stack. If it matches, pop. If not, invalid.\n\n" +
      "At the end, the stack must be empty.\n\n" +
      "### Concrete walkthrough\n\n" +
      "Input: round-curly-square-closesquare-closecurly-closeround.\n\n" +
      "- Open round: push close-round. Stack = [close-round].\n" +
      "- Open curly: push close-curly. Stack = [close-round, close-curly].\n" +
      "- Open square: push close-square. Stack = [close-round, close-curly, close-square].\n" +
      "- Close square: top is close-square, matches, pop. Stack = [close-round, close-curly].\n" +
      "- Close curly: top is close-curly, matches, pop. Stack = [close-round].\n" +
      "- Close round: top is close-round, matches, pop. Stack empty.\n\n" +
      "End. Stack empty. Return true.\n\n" +
      "### Takeaway\n\n" +
      "Any time nesting matters and you process left-to-right, reach for a stack.",
    intermediate:
      "## Pattern: stack-based matching\n\n" +
      "### Key insight\n\n" +
      "Parentheses are a context-free language. Regular expressions cannot validate them. A stack is both sufficient and minimal.\n\n" +
      "### Algorithm\n\n" +
      "stack = []\npairs = close-round to open-round, close-curly to open-curly, close-square to open-square\nfor c in s:\n  if c is an opener:\n    stack.push(c)\n  else:\n    if stack is empty or stack.top() does not equal pairs[c]: return false\n    stack.pop()\nreturn stack.is_empty()\n\n" +
      "### Common mistakes\n\n" +
      "- Forgetting the stack-empty check on a closer, which causes pop to throw.\n" +
      "- Using only the count of opens minus closes. That works for a single bracket type but fails on mixed types (for example a square-round mismatch).\n" +
      "- Not checking final emptiness; a string of only opens has no mismatches but is still invalid.\n\n" +
      "### Complexity\n\n" +
      "O(n) time. O(n) space for the stack in worst case.",
    expert:
      "## Expert analysis\n\n" +
      "Valid Parentheses is the minimal example of using a stack to recognize a context-free language. The lesson extends to: HTML tag validation, nested comments, function-call stacks, arithmetic expression parsing.\n\n" +
      "### Variants and their escalation\n\n" +
      "- Min Add to Make Parentheses Valid: count mismatches, no stack needed for single bracket type.\n" +
      "- Score of Parentheses: stack of running scores.\n" +
      "- Longest Valid Parentheses: stack of indices, or DP.\n" +
      "- Remove Invalid Parentheses: BFS over strings with one removal per step (or DFS with pruning).\n" +
      "- Generate Parentheses: backtracking with feasibility constraints.\n\n" +
      "### Related pattern: monotonic stack\n\n" +
      "The stack here is not monotonic (brackets have no natural order). But many problems use monotonic stacks: next greater element, daily temperatures, largest rectangle in histogram. Recognize by for each element, find the nearest larger or smaller one.\n\n" +
      "### Why this problem matters\n\n" +
      "It is the easiest stack signal in the interview bank. A candidate who reaches for a stack unprompted shows familiarity with context-free grammars. A candidate who tries regex or count-only shows shallow pattern-matching.\n\n" +
      "### Implementation notes\n\n" +
      "In competitive languages (C++, Java, Python), built-in stacks or deques are standard. In JavaScript, an array with push and pop behaves as a stack with O(1) amortized. Avoid Array.prototype.shift (which is O(n)) if you accidentally use it.",
  },
};

// Given a problem slug and topic tags, return the best fallback explanations.
export function getFallbackExplanation(
  slug: string,
  topics: string[] | null | undefined
): TieredExplanation | null {
  if (SLUG_FALLBACKS[slug]) return SLUG_FALLBACKS[slug];
  for (const topic of topics ?? []) {
    const key = topic.toLowerCase();
    if (PATTERN_FALLBACKS[key]) return PATTERN_FALLBACKS[key];
  }
  return null;
}

// Absolute last-resort generic explanation when no topic matches and no slug matches.
export const GENERIC_FALLBACK: TieredExplanation = {
  eli5:
    "## A general approach to interview problems\n\n" +
    "When you are stuck, walk through a tiny concrete example by hand. Write down what you would do at each step. Often the algorithm falls out of the trace.\n\n" +
    "### Four reliable questions\n\n" +
    "1. What is the input shape? Array, string, tree, graph, matrix?\n" +
    "2. What is the output shape? A number, an index, a sequence, a boolean?\n" +
    "3. Can I solve it with a single scan, or do I need nested scans?\n" +
    "4. Is there a smaller data structure (set, map, stack, queue, heap) that would let me answer each step in O(1) instead of O(n)?\n\n" +
    "### A concrete trick\n\n" +
    "For most array and string problems, try this sequence:\n\n" +
    "1. Write the brute force. Confirm it works on the small example.\n" +
    "2. Find the repeated work. Is the inner loop computing something that could be precomputed or memoized?\n" +
    "3. Replace the inner loop with a hash lookup, a running counter, or a pointer move.\n\n" +
    "### Takeaway\n\n" +
    "The pattern is almost never novel. It is one of: hash of seen values, two pointers, sliding window, prefix sum, stack, heap, BFS/DFS, DP, backtracking. Learn these seven deeply and 80 percent of the interview bank becomes recognizable.",
  intermediate:
    "## A general framework\n\n" +
    "### Step 1. Clarify\n\n" +
    "Restate the problem in your own words. Confirm input constraints, output format, edge cases (empty input, single element, duplicates, negatives).\n\n" +
    "### Step 2. Brute force\n\n" +
    "State the obvious O(n^2) or O(2^n) answer. It establishes correctness and gives the interviewer a floor.\n\n" +
    "### Step 3. Identify the pattern\n\n" +
    "Classify into one of the seven canonical shapes: hash lookup, two pointers, sliding window, prefix sum, stack or queue, heap, DP, backtracking, BFS or DFS.\n\n" +
    "### Step 4. Implement\n\n" +
    "Write clean code with clear variable names. Handle the edge cases you identified.\n\n" +
    "### Step 5. Trace\n\n" +
    "Run a small example by hand. Match your trace to the expected output.\n\n" +
    "### Step 6. Complexity\n\n" +
    "State time and space complexity. Discuss tradeoffs if alternatives exist.\n\n" +
    "### Common mistakes\n\n" +
    "- Starting to code before clarifying constraints.\n" +
    "- Optimizing before the brute force is correct.\n" +
    "- Not tracing through an edge case before declaring done.",
  expert:
    "## Senior-level framing\n\n" +
    "### Axes of classification\n\n" +
    "- Structure: array, string, tree, graph, matrix, linked list.\n" +
    "- Operation: search, count, transform, construct.\n" +
    "- Constraint: memory-tight, latency-tight, unknown stream size.\n" +
    "- Correctness: one-shot answer or stream with updates.\n\n" +
    "Each axis suggests a family of techniques.\n\n" +
    "### Algorithmic toolkit by category\n\n" +
    "- Search: binary search (sorted or monotonic), BFS or DFS (graph or tree), two pointers (sorted).\n" +
    "- Count: hash map of seen, prefix sum, segment tree, BIT.\n" +
    "- Transform: in-place swap, sort plus scan, DP.\n" +
    "- Construct: backtracking, greedy, union-find.\n" +
    "- Stream: reservoir sampling, running statistics, two heaps for median.\n\n" +
    "### Tradeoffs to articulate\n\n" +
    "- Time vs space: hash maps trade space for time.\n" +
    "- Preprocess vs query: segment trees trade O(n) build for O(log n) queries.\n" +
    "- Recursion vs iteration: recursion is cleaner, iteration avoids stack overflow.\n" +
    "- Approximation vs exact: LSH and Bloom filters are O(1) at the cost of false positives.\n\n" +
    "### What senior interviewers probe\n\n" +
    "- Can you identify the pattern within 2 minutes?\n" +
    "- Can you articulate why your chosen pattern is the right one?\n" +
    "- Can you analyze complexity precisely?\n" +
    "- Can you discuss 1 to 2 alternative approaches and their tradeoffs?\n" +
    "- Can you handle follow-ups about scaling to 10x or 1000x input?",
};

export function getFallbackExplanationOrGeneric(
  slug: string,
  topics: string[] | null | undefined
): TieredExplanation {
  return getFallbackExplanation(slug, topics) ?? GENERIC_FALLBACK;
}
