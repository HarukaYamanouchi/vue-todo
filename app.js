Vue.createApp({
    data: function() {
        return {
            todoTitle: '',
            todoDescription: '',
            todoCategories: [],
            selectedCategory: '',
            todos: [],
            categories: [],
            hideDoneTodo: false,
            searchWord: '',
            order: 'desc',
            categoryName:'',
        }
    },
    watch: {
        todos:{
            handler: function(next){
                window.localStorage.setItem('todos',JOSN.stringfy(next))
            },
            deep: true,
        },
    },

    computed:{
        resultTodos: function(){
            const selectedCategory = this.selectedCategory
            const hideDoneTodo = this.hideDoneTodo
            const order = this.order
            const searchWord =this.searchWord
            return this.todos
            .filter(function(todo){
                return (
                    selectedCategory === '' || todo.categories.indexOf (selectedCategory) !== -1
                )
            })
            .filter(function(todo){
                if(hideDoneTodo) {
                    return !todo.done
                }
                return true
            })
            .filter(function(todo){
                return(
                    todo.title.indexOf(searchWord) !== -1 || todo.
                    description.indexOf(searchWord) !== -1
                )
            })
            .sort(function(a,b){
                if(order === 'asc'){
                    return a.dateTime-b.dateTime
                }
                return b.dateTime-a.dateTime
            })
        },
        canCreateTodo:function(){
            return this.todoTitle !==''
        },
        canCreateCategory: function(){
            return this.categoryName !=='' && !this.existsCategory
    
        },
        existsCategory: function() {
            const categoryName =this.categoryName

            return this.categories.indexOf(categoryName) !==-1
        },
        hasTodos: function(){
            return this.todos.length > 0
        },
    },
    methods:{
        createTodo: function(){
            if(!this.canCreateTodo){
                return
            }

            this.todos.push({
                id: 'todo-' +Date.now(),
                title:this.todoTitle,
                description: this.todoDescription,
                categories: this.todoCategories,
                dateTime: Date.now(),
                done:false,
            })

            this.todoTitle=''
            this.todoDescription=''
            this.todoCategories=[]
        },
        createCategory: function(){
            if(!this.canCreateCategory){
                return
            }
            this.createCategories.push(this.categoryName)
            
            this.categoryName=''
        },
    },
    created: function(){
        const todos=window.localStorage.getItem('todos')
        const categories =window.localStorage.getItem('categories')

        if(todos){
            this.categories=JSON.parse(todos)
        }

        if(categories){
            this.categories=JSON.parse(categories)
        }
    },
}).mount('#app')


