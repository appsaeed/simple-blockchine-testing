const $ = {
  blocks: [],
  init: async function () {
    console.log("Blockchin init");
    await $.createGenesis();
    await $.addBlock("why");
    await $.addBlock("How");
    await $.addBlock("Hello");
    console.log($.blocks);
  },
  createGenesis: async function () {
    const block = {
      message: "Unick block message",
      datetime: Date.now(),
      prev_has: 0,
      id: 0,
    };
    await $.hashBlock(block);
  },
  addBlock: async function (message) {
    const id = $.blocks.length;
    let prev_has = await $.prevHash();
    const block = {
      message: message,
      datetime: Date.now(),
      prev_has: prev_has,
      id: id,
    };
    await $.hashBlock(block);
  },
  prevHash: async function () {
    let index = $.blocks.length - 1;
    return $.blocks[index].hash;
  },
  verify: async function (hash) {
    console.log($.blocks.length);
    return hash.startsWith("07");
  },
  hashBlock: async function (block) {
    block.nonce = 0;
    await recur(block);
    async function recur(block) {
      const data = JSON.stringify(block);
      const hash = await a(data);
      if (await $.verify(hash)) {
        $.blocks.push({
          block: block,
          hash: hash,
        });
      } else {
        block.nonce = block.nonce + 1;
        await recur(block);
      }
    }
    async function a(b) {
      function c(a, b) {
        return (a >>> b) | (a << (32 - b));
      }
      for (
        var d,
          e,
          f = Math.pow,
          g = f(2, 32),
          h = "length",
          i = "",
          j = [],
          k = 8 * b[h],
          l = (a.h = a.h || []),
          m = (a.k = a.k || []),
          n = m[h],
          o = {},
          p = 2;
        64 > n;
        p++
      )
        if (!o[p]) {
          for (d = 0; 313 > d; d += p) o[d] = p;
          (l[n] = (f(p, 0.5) * g) | 0), (m[n++] = (f(p, 1 / 3) * g) | 0);
        }
      for (b += "\x80"; (b[h] % 64) - 56; ) b += "\x00";
      for (d = 0; d < b[h]; d++) {
        if (((e = b.charCodeAt(d)), e >> 8)) return;
        j[d >> 2] |= e << (((3 - d) % 4) * 8);
      }
      for (j[j[h]] = (k / g) | 0, j[j[h]] = k, e = 0; e < j[h]; ) {
        var q = j.slice(e, (e += 16)),
          r = l;
        for (l = l.slice(0, 8), d = 0; 64 > d; d++) {
          var s = q[d - 15],
            t = q[d - 2],
            u = l[0],
            v = l[4],
            w =
              l[7] +
              (c(v, 6) ^ c(v, 11) ^ c(v, 25)) +
              ((v & l[5]) ^ (~v & l[6])) +
              m[d] +
              (q[d] =
                16 > d
                  ? q[d]
                  : (q[d - 16] +
                      (c(s, 7) ^ c(s, 18) ^ (s >>> 3)) +
                      q[d - 7] +
                      (c(t, 17) ^ c(t, 19) ^ (t >>> 10))) |
                    0),
            x =
              (c(u, 2) ^ c(u, 13) ^ c(u, 22)) +
              ((u & l[1]) ^ (u & l[2]) ^ (l[1] & l[2]));
          (l = [(w + x) | 0].concat(l)), (l[4] = (l[4] + w) | 0);
        }
        for (d = 0; 8 > d; d++) l[d] = (l[d] + r[d]) | 0;
      }
      for (d = 0; 8 > d; d++)
        for (e = 3; e + 1; e--) {
          var y = (l[d] >> (8 * e)) & 255;
          i += (16 > y ? 0 : "") + y.toString(16);
        }
      return i;
    }
  },
};

$.init();
