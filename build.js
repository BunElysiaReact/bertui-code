// build.js
import { build } from 'bun';
import { rm } from 'fs/promises';

// Clean dist first
try {
  await rm('./dist', { recursive: true, force: true });
  console.log('🧹 Cleaned dist directory');
} catch (err) {
  // Ignore if dist doesn't exist
}

console.log('🚀 Building bertui-code...');

const result = await build({
  entrypoints: ['./src/index.js'],
  outdir: './dist',
  format: 'esm',
  target: 'browser',
  external: ['react'],
  splitting: false,
  sourcemap: 'none',
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  // Force classic JSX transform
  jsx: {
    factory: 'React.createElement',
    fragment: 'React.Fragment',
  },
});

if (result.success) {
  console.log(`✅ Build complete! Output: ${result.outputs.map(o => o.path).join(', ')}`);
  
  // Verify no jsx-runtime imports
  const { readFile } = await import('fs/promises');
  const outputFile = result.outputs[0]?.path;
  
  if (outputFile) {
    const content = await readFile(outputFile, 'utf-8');
    if (content.includes('jsx-runtime') || content.includes('jsx-dev-runtime')) {
      console.warn('⚠️  Warning: Build still contains jsx-runtime imports!');
    } else {
      console.log('✨ No jsx-runtime imports detected - clean build!');
    }
  }
} else {
  console.error('❌ Build failed:', result.logs);
  process.exit(1);
}