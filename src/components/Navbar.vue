<template>
    <div class="flex items-center justify-between">
        <img
        src="../assets/logo.png"
        alt="CookBook Explorer Pro Logo"
        class="h-32"
      />
        <ul class="text-gray-700 flex gap-4">
            <li>
                <router-link to="/" class="p-2 hover:text-[#E79801] font-thin transition-all duration-300">Home</router-link>
            </li>
            <li>
                <router-link to="/recipes" class="p-2 hover:text-[#E79801] font-thin transition-all duration-300">Recipes</router-link>
            </li>
            <li>
                <router-link to="/planner" class="p-2 hover:text-[#E79801] font-thin transition-all duration-300">Weekly Planner</router-link>
            </li>
            
        </ul>
    </div>
</template>
<script>

export default {
    name: "Navbar",
    data() {
        return {}
    }
}
</script>


<style>
    
</style>
