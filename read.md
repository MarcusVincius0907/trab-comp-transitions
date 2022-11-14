
## Concurrence

input a 0
input b 0
output x 0
output y 0
0 1 a+ | x+ y+
1 2 b+ | y-
2 0 a- b- | x-

## Decision

input a 0
input b 0
output x 0
output z 0
0 1 a+ | z+
1 2 [a-] | z-
1 3 [b+] | z-
2 4 b+ | x+
4 0 b- | x-
3 5 a- | x+
5 0 b- | x-


## Simple

input a 0
input b 0
input c 0
output x 0
output y 0
output z 0
0 1 a+ | x+
1 2 b+ | y+
2 3 c+ | z+
3 4 a- | x-
4 5 b- | y-
5 0 c- | z-
