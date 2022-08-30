
<template>
    <div class="page-login min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.page-login {
    height: 100vh;
    background: url(https://images.unsplash.com/photo-1512386233331-f023884a92e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
}
</style>