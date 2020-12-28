import time, sys

# The Computer Language Benchmarks Game
# https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

#    contributed by Isaac Gouy
#    converted to Java by Oleg Mazurov
#    converted to Python by Buck Golemon
#    modified by Justin Peel

def fannkuch(n):
    maxFlipsCount = 0
    permSign = True
    checksum = 0

    perm1 = list(range(n))
    count = perm1[:]
    rxrange = range(2, n - 1)
    nm = n - 1
    while 1:
        k = perm1[0]
        if k:
            perm = perm1[:]
            flipsCount = 1
            kk = perm[k]
            while kk:
                perm[:k+1] = perm[k::-1]
                flipsCount += 1
                k = kk
                kk = perm[kk]
            if maxFlipsCount < flipsCount:
                maxFlipsCount = flipsCount
            checksum += flipsCount if permSign else -flipsCount

        # Use incremental change to generate another permutation
        if permSign:
            perm1[0],perm1[1] = perm1[1],perm1[0]
            permSign = False
        else:
            perm1[1],perm1[2] = perm1[2],perm1[1]
            permSign = True
            for r in rxrange:
                if count[r]:
                    break
                count[r] = r
                perm0 = perm1[0]
                perm1[:r+1] = perm1[1:r+2]
                perm1[r+1] = perm0
            else:
                r = nm
                if not count[r]:
                    print( checksum )
                    return maxFlipsCount
            count[r] -= 1

from sys import argv

def main(n):
    t = time.time()

    sys.stdout.write(( "Pfannkuchen(%i) = %i\n" % (n, fannkuch(n)) ))
    sys.stderr.write("time({0})\n".format(time.time() - t))

n = int(sys.argv[1]) if len(sys.argv) > 1 else 7
times = int(sys.argv[2]) if len(sys.argv) > 2 else 1

sys.stderr.write("started")
sys.stderr.flush()

for i in range(0,times):
    main(n)