import { execSync } from 'child_process';

async function globalTeardown() {
  console.log(`Stopping db for ${process.env.NODE_ENV} environment...`);
  try {
    execSync('docker compose down -v', { stdio: 'inherit' });
  } catch (error) {
    console.error( error);
  }
}

export default globalTeardown;