<?php

use App\Console\Commands\Maintenance\PruneOrphanedBackupsCommand;
use App\Console\Commands\Maintenance\PruneUsersCommand;
use App\Console\Commands\Server\ResetUsagesCommand;
use App\Console\Commands\Server\UpdateRateLimitsCommand;
use App\Console\Commands\Server\UpdateUsagesCommand;
use App\Models\ActivityLog;
use Illuminate\Database\Console\PruneCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::command('queue:prune-batches')->daily();

if (config('backups.prune_age')) {
    // Every 30 minutes, run the backup pruning command so that any abandoned backups can be deleted.
    Schedule::command(PruneOrphanedBackupsCommand::class)->everyThirtyMinutes();
}

if (config('activity.prune_days')) {
    Schedule::command(PruneCommand::class, ['--model' => [ActivityLog::class]])->daily();
}

Schedule::command(ResetUsagesCommand::class)->daily();
Schedule::command(PruneUsersCommand::class)->daily();
Schedule::command(UpdateUsagesCommand::class)->everyFiveMinutes();
Schedule::command(UpdateRateLimitsCommand::class)->everyTenMinutes();
