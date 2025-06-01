import { nanoid } from 'nanoid';

function uniqueId(strategy = nanoid) {
    return strategy();
}

export default uniqueId