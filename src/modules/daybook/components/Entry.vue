<template>
    <div @click="$router.push({ name:'entry', params:{ id:10 } })" class="entry-container mb-3 pointer p-2">
        <div class="entry-title d-fex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-ligth">2021, junio</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad nesciunt vitae deserunt delectus, architecto quaerat minus quos accusantium. Accusamus officiis eius quos culpa dicta sunt recusandae temporibus blanditiis sint error?
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all aese-in;

    &hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all aese-in;
    }

    .entry-description{
        font-size: 12px;
    }
}

</style>