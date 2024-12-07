<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\FindPasskeyToAuthenticateAction;
use App\Actions\Auth\GeneratePasskeyAuthenticationOptionsAction;
use App\Exceptions\Http\Auth\InvalidAuthenticationMethodException;
use App\Exceptions\Http\Auth\InvalidPasskeyException;
use App\Http\Requests\Auth\ConfirmIdentityRequest;
use Illuminate\Http\Request;
use Laravel\Fortify\Http\Responses\FailedPasswordConfirmationResponse;

/**
 * Controller responsible for handling identity reconfirmation
 * for users who are already authenticated. This is typically
 * used for sensitive actions requiring additional verification.
 */
class ConfirmableIdentityController
{
    public function __construct(
        private GeneratePasskeyAuthenticationOptionsAction $generateOptionsAction,
        private FindPasskeyToAuthenticateAction $findPasskeyAction,
    ) {}

    public function generatePasskeyAuthOptions(Request $request)
    {
        $options = $this->generateOptionsAction->execute();

        $request->session()->put('passkeys.authentication-options', $options);

        return $options;
    }

    public function store(ConfirmIdentityRequest $request)
    {
        if ($request->filled('passkey')) {
            // Handle passkey authentication
            $passkey = $this->findPasskeyAction->execute(
                $request->input('passkey'),
                $request->session()->get('passkeys.authentication-options')
            );

            if (! $passkey || ! $passkey->user || $passkey->user->id !== $request->user()->id) {
                throw new InvalidPasskeyException;
            }
        } elseif ($request->filled('password')) {
            // Handle password confirmation
            $confirmed = auth()->validate([
                'email' => $request->user()->email,
                'password' => $request->input('password'),
            ]);

            if (! $confirmed) {
                return app(FailedPasswordConfirmationResponse::class);
            }
        } else {
            throw new InvalidAuthenticationMethodException;
        }

        // Store the confirmation timestamp in the session
        $request->session()->put('auth.identity_confirmed_at', now()->timestamp);

        return response()->noContent();
    }
}
