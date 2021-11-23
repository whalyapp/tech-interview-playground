# version_settings() enforces a minimum Tilt version
# https://docs.tilt.dev/api.html#api.version_settings
version_settings(constraint='>=0.22.2')

# blog-api is the backend (Python/Flask app)
# live_update syncs changed source code files to the correct place for the Flask dev server
# and runs pip (python package manager) to update dependencies when changed
# https://docs.tilt.dev/api.html#api.docker_build
# https://docs.tilt.dev/live_update_reference.html
docker_build(
    'blog-api',
    context='.',
    dockerfile='./deploy/api.dockerfile',
    only=['./api/'],
    live_update=[
        sync('./api/', '/app/api/'),
        run(
            'npm install',
            trigger=['./api/package.json', './api/package-lock.json']
        )
    ]
)

# k8s_yaml automatically creates resources in Tilt for the entities
# and will inject any images referenced in the Tiltfile when deploying
# https://docs.tilt.dev/api.html#api.k8s_yaml
k8s_yaml('deploy/api.yaml')

# k8s_resource allows customization where necessary such as adding port forwards and labels
# https://docs.tilt.dev/api.html#api.k8s_resource
k8s_resource(
    'api',
    port_forwards='5734:5000',
    labels=['backend']
)

# blog-web is the frontend (ReactJS/vite app)
# live_update syncs changed source files to the correct place for vite to pick up
# and runs yarn (JS dependency manager) to update dependencies when changed
# if vite.config.js changes, a full rebuild is performed because it cannot be
# changed dynamically at runtime
# https://docs.tilt.dev/api.html#api.docker_build
# https://docs.tilt.dev/live_update_reference.html
docker_build(
    'blog-web',
    context='.',
    dockerfile='./deploy/web.dockerfile',
    only=['./web/'],
    ignore=['./web/dist/'],
    live_update=[
        sync('./web/', '/app/'),
        run(
            'npm install',
            trigger=['./web/package.json', './web/package-lock.json']
        )
    ]
)

# k8s_yaml automatically creates resources in Tilt for the entities
# and will inject any images referenced in the Tiltfile when deploying
# https://docs.tilt.dev/api.html#api.k8s_yaml
k8s_yaml('deploy/web.yaml')

# k8s_resource allows customization where necessary such as adding port forwards and labels
# https://docs.tilt.dev/api.html#api.k8s_resource
k8s_resource(
    'web',
    port_forwards='5735:3000',
    labels=['frontend']
)

# print writes messages to the (Tiltfile) log in the Tilt UI
# the Tiltfile language is Starlark, a simplified Python dialect, which includes many useful built-ins
# https://github.com/bazelbuild/starlark/blob/master/spec.md#print
print("""
\033[32m\033[32mHello World from our Blog!\033[0m
""")