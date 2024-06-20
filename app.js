Vue.createApp({
    data: function() {
        return {
            todoTitle: '',
            todoDescription: '',
            todoCategories: [],
            selectedCategory: '',
            hideDoneTodo: false,
            searchWord: '',
            order: 'desc',
            categoryName:'',
        }
    },
    computed:{
        canCreateTodo:function(){
            return this.todoTitle !==''
        },
        canCreateCategory: function(){
            return this.categoryName !==''
        },
    },
    methods:{
        createTodo: function(){
            if(!this.canCreateTodo){
                return
            }

            this.todoTitle=''
            this.todoDescription=''
            this.todoCategories=[]
        },
        createCategory: function(){
            if(!this.canCreateCategory){
                return
            }
            this.categoryName=''
        },
    },
}).mount('#app')


