import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { brotliDecompressSync } from 'node:zlib';

// The original 3D asset is stored as four Brotli-compressed Git blobs to keep
// Git-linked preview builds deterministic, without relying on Python/Blender.
const base = join(process.cwd(), 'public/models');
const chunks = Array.from({length:4}, (_,i)=>readFileSync(join(base, `wayfinder.br.part${i}`)));
const payload = Buffer.concat(chunks);
const checksum = createHash('sha256').update(payload).digest('hex');
if (checksum !== '350cd7e2ad29746b15089bf60a740e381b35efbbadc3ebc3c25bf83d4707fdb7') {
  throw new Error('Wayfinder asset checksum mismatch; refusing to unpack.');
}
const glb = brotliDecompressSync(payload);
if(glb.subarray(0,4).toString('ascii')!=='glTF' || glb.length!==181076){
  throw new Error('Wayfinder glTF payload did not pass integrity checks.');
}
writeFileSync(join(base,'wayfinder.glb'),glb);
process.stdout.write(`Wayfinder GLB prepared (${glb.length} bytes).\n`);