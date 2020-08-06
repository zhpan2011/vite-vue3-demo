import {defineComponent} from "vue";
import {toast} from "bulma-toast";

// export const Message = (propsData = {
//     message: '',
//     type: "is-success",
//     duration: 2000,
//     position: "top",
//     closeOnClick: true,
//     dismissible: true,
//     animate: { in: "fadeIn", out: "fadeOut" },
//     opacity: 1
// }) => {
//     return new MessageComponent({
//         el: document.createElement('div'),
//         propsData
//     })
// };

// export const Toast = toast({
//     message: "Hello There",
//     type: "is-success",
//     dismissible: true,
//     animate: { in: "fadeIn", out: "fadeOut" }
// });

export const Toast = (propsData = {
    message: '123',
    type: "is-success",
    duration: 500,
    position: "top-right",
    closeOnClick: true,
    dismissible: true,
    animate: {in: 'bounceInRight', out: 'bounceOutRight'},
    opacity: 1
}) => {
    return new toast(propsData)
};


