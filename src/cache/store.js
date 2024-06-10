const cache = {};                           // in memory store
const DEFAULT_TTL = 600;                    // default 10 mins

export function set(key, value, ttl = DEFAULT_TTL) {
    const now = Date.now();
    cache[key] = { value, expiresAt: now + ttl * 1000 };
};

export function get(key) {
    const cached = cache[key];
    if (!cached) {
        return null;
    }

    if (Date.now() > cached.expiresAt) {
        delete cache[key];
        return null;
    }

    return cached.value;
};

export function clear() {
    Object.keys(cache).forEach((key) => delete cache[key]);
};

export function deleteKey(key) {
    delete cache[key];
};

const cleanupInterval = 10 * 60 * 1000;     // cleanup after 10 mins
setInterval(() => {
    const now = Date.now();
    for (const key in cache) {
        if (cache[key].expiresAt <= now) {
            delete cache[key];
        }
    }
}, cleanupInterval);