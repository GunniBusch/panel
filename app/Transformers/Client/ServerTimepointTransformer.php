<?php

namespace Convoy\Transformers\Client;

use Convoy\Data\Server\Proxmox\Usages\ServerTimepointData;
use League\Fractal\TransformerAbstract;

class ServerTimepointTransformer extends TransformerAbstract
{
    public function transform(ServerTimepointData $data): array
    {
        return $data->toArray();
    }
}
