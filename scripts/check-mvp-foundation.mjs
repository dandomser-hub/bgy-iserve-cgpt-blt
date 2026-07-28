import { access, readFile } from 'node:fs/promises';
import process from 'node:process';

const root = 'apps/mvp';
const requiredFiles = [
  'artisan',
  'composer.json',
  '.env.example',
  'bootstrap/app.php',
  'bootstrap/providers.php',
  'config/modules.php',
  'routes/api.php',
  'app/Providers/DomainModuleServiceProvider.php',
  'database/seeders/FoundationSeeder.php',
  'tests/Feature/HealthEndpointTest.php',
  'tests/Unit/ModuleBoundaryTest.php',
];

const moduleDirectories = [
  'ResidentHousehold',
  'DocumentServices',
  'CaseIncidentProtection',
  'Drrm',
  'Gad',
  'GovernanceReporting',
  'AdministrationSecurity',
  'ReferenceData',
];

const failures = [];

for (const path of requiredFiles) {
  try {
    await access(`${root}/${path}`);
  } catch {
    failures.push(`Missing Laravel foundation file: ${path}`);
  }
}

for (const directory of moduleDirectories) {
  try {
    await access(`${root}/app/Modules/${directory}`);
  } catch {
    failures.push(`Missing domain module directory: ${directory}`);
  }
}

const composer = JSON.parse(await readFile(`${root}/composer.json`, 'utf8'));
if (composer.require?.php !== '^8.3') {
  failures.push('Laravel foundation must require PHP ^8.3.');
}
if (!composer.require?.['laravel/framework']?.startsWith('^13.')) {
  failures.push('Laravel foundation must use Laravel 13.');
}

const env = await readFile(`${root}/.env.example`, 'utf8');
for (const setting of [
  'APP_NAME="Barangay iSERVE"',
  'APP_TIMEZONE=Asia/Manila',
  'DB_CONNECTION=pgsql',
  'DB_PORT=5432',
]) {
  if (!env.includes(setting)) failures.push(`Missing environment baseline: ${setting}`);
}

const bootstrap = await readFile(`${root}/bootstrap/app.php`, 'utf8');
if (!bootstrap.includes("apiPrefix: 'api/v1'")) {
  failures.push('Versioned API prefix is not configured.');
}
if (!bootstrap.includes("health: '/up'")) {
  failures.push('Laravel boot health route is not configured.');
}

const api = await readFile(`${root}/routes/api.php`, 'utf8');
if (!api.includes("Route::get('/health'")) {
  failures.push('Versioned JSON health endpoint is missing.');
}

const seed = await readFile(`${root}/database/seeders/DatabaseSeeder.php`, 'utf8');
if (!seed.includes('FoundationSeeder::class')) {
  failures.push('DatabaseSeeder does not use the controlled foundation seed strategy.');
}
if (seed.includes('test@example.com')) {
  failures.push('Default demo credentials must not be seeded.');
}

if (failures.length > 0) {
  failures.forEach(failure => console.error(`MVP foundation contract failed: ${failure}`));
  process.exit(1);
}

console.log(
  `MVP foundation contract passed: Laravel 13, PostgreSQL, API v1, health endpoints, `
  + `${moduleDirectories.length} domain boundaries, and controlled seeding are present.`,
);
