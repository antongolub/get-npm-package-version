const getNpmPkgVersion = function (packageName, { registry = '', timeout = null } = {}) {
    try {
        if (/[`$&{}[;|]/g.test(packageName) || /[`$&{}[;|]/g.test(registry)) {
            return null
        }
        let version;

        const config = {
            stdio: ['pipe', 'pipe', 'ignore']
        };

        if (timeout) {
            config.timeout = timeout;
        }

        if (registry) {
            version = require('child_process').execSync(`npm view ${packageName} version --registry ${registry}`, config);
        } else {
            version = require('child_process').execSync(`npm view ${packageName} version`, config);
        }

        if (version) {
            return version.toString().trim().replace(/^\n*|\n*$/g, '');
        } else {
            return null;
        }

    } catch(err) {
        return null;
    }
}

getNpmPkgVersion.getNpmPkgVersion = getNpmPkgVersion // Named export

module.exports = getNpmPkgVersion
