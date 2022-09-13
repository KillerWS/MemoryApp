const initialState = {inputValue: 'itclanCoder', list: ['itclanCoder', '川川', '学习Redux'] };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TEST1':
        console.log("TEST1信息："+initialState.inputValue)
        return { ...state, inputValue: "啦啦啦" };
        case 'TEST2':
            console.log("TEST2信息："+action.payload)
            return { ...state, inputValue: action.payload };
        default:
        return state;
    }

    


}