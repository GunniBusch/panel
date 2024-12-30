<?php

namespace Convoy\Repositories\Proxmox\Node;

use Convoy\Models\Node;
use Illuminate\Support\Str;
use Webmozart\Assert\Assert;
use Convoy\Data\Node\Access\UserData;
use Convoy\Enums\Node\Access\RealmType;
use Convoy\Data\Node\Access\CreateUserData;
use Convoy\Data\Node\Access\UserCredentialsData;
use Convoy\Repositories\Proxmox\ProxmoxRepository;

class ProxmoxAccessRepository extends ProxmoxRepository
{
    public function getUsers()
    {
        Assert::isInstanceOf($this->node, Node::class);

        $response = $this->getHttpClient()
            ->get('/api2/json/access/users')
            ->json();

        $users = array_filter($this->getData($response), function ($user) {
            try {
                RealmType::from($user['realm-type']);
                return true;
            } catch (\ValueError $e) {
                return false;
            }
        });

        $users = array_map(fn ($user) => UserData::fromRaw($user), $users);

        return UserData::collection($users);
    }

    public function createUser(CreateUserData $data): CreateUserData
    {
        Assert::isInstanceOf($this->node, Node::class);

        $payload = [
            'enable' => $data->enabled,
            'userid' => ($data->username ?? 'convoy-'.Str::random(53)).'@'.$data->realm_type->value,
            'password' => $data->password ?? Str::random(64),
            'expire' => $data->expires_at?->timestamp ?? false,
        ];

        $this->getHttpClient()
            ->post('/api2/json/access/users', $payload)
            ->json();

        return CreateUserData::from([
            'username' => explode('@', $payload['userid'])[0],
            'realm_type' => $data->realm_type,
            'password' => $payload['password'],
            'enabled' => $payload['enable'],
            'expires_at' => $data->expires_at,
        ]);
    }

    public function deleteUser(string $id, RealmType $realmType)
    {
        Assert::isInstanceOf($this->node, Node::class);

        $response = $this->getHttpClient()
            ->withUrlParameters([
                'user' => $id.'@'.$realmType->value,
            ])
            ->delete('/api2/json/access/users/{user}')
            ->json();

        return $this->getData($response);
    }

    public function createRole(string $name, string $privileges)
    {
        Assert::isInstanceOf($this->node, Node::class);

        $payload = [
            'roleid' => $name,
            'privs' => $privileges,
        ];

        $response = $this->getHttpClient()
            ->post('/api2/json/access/roles', $payload)
            ->json();

        return $this->getData($response);
    }

    public function createUserCredentials(RealmType $realmType, string $userid, string $password): UserCredentialsData
    {
        Assert::isInstanceOf($this->node, Node::class);

        $response = $this->getHttpClient(shouldAuthorize: false)
            ->post('/api2/json/access/ticket', [
                'username' => $userid,
                'password' => $password,
                'realm' => $realmType->value,
            ])
            ->json();

        return UserCredentialsData::fromRaw($this->getData($response));
    }
}
