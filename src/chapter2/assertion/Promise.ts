const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000);
        setTimeout(() => {
            reject(false)
        }, 1000);
    });
};

const successCallback = () => {
    console.log("成功した");
}

const failureCallback = () => {
    console.log("失敗した")
}

doSomethingAsync()
    .then(successCallback)
    .catch(failureCallback);

doSomethingAsync()
    .then(successCallback, failureCallback);

// @ts-ignore
const task = (callback, name, total) => {
    setTimeout(() => {
        total += 1
        console.log(`${name} finished! Total is${total}.`)
        callback(total)
    }, 1000);
}

// @ts-ignore
task(total => {
    // @ts-ignore
    task(total => {
        // @ts-ignore
        task(total => {
            // @ts-ignore
            task(total => {
                task(() => {
                }, "task-5", total);
            }, "task-4", total);
        }, "task-3", total);
    }, "task-2", total);
}, "task-1", 0);

// @ts-ignore
const taskPromise = (name, total) => {
    return new Promise(resolve => {
        setTimeout(() => {
            total += 1
            console.log(`${name} finished! Total is ${total}.`)
            resolve(total)
        }, 1000);
    });
};

taskPromise("task-1", 0)
    .then(total => taskPromise("task-2", total))
    .then(total => taskPromise("task-3", total))
    .then(total => taskPromise("task-4", total))
    .then(total => taskPromise("task-5", total));
