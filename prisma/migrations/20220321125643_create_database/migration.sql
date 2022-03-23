-- CreateTable
CREATE TABLE `conjuge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` BIGINT NOT NULL,
    `rg` BIGINT NOT NULL,
    `nis` BIGINT NULL,
    `escolaridade` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `modeloDeTrabalho` VARCHAR(191) NOT NULL,
    `cnpjCtps` BIGINT NOT NULL DEFAULT 0,
    `renda` INTEGER NULL,
    `nomeTitular` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Conjuge_id_key`(`id`),
    UNIQUE INDEX `Conjuge_nome_key`(`nome`),
    UNIQUE INDEX `Conjuge_cpf_key`(`cpf`),
    UNIQUE INDEX `Conjuge_rg_key`(`rg`),
    UNIQUE INDEX `conjuge_nomeTitular_key`(`nomeTitular`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `filho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` BIGINT NOT NULL,
    `rg` BIGINT NOT NULL,
    `escolaridade` VARCHAR(191) NOT NULL,
    `cursando` VARCHAR(191) NOT NULL,
    `pcd` VARCHAR(191) NOT NULL DEFAULT 'Não',
    `doencas` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `modeloDeTrabalho` VARCHAR(191) NOT NULL,
    `cnpjCtps` BIGINT NOT NULL,
    `nomeTitular` VARCHAR(191) NOT NULL,
    `renda` INTEGER NULL,

    UNIQUE INDEX `Filho_id_key`(`id`),
    UNIQUE INDEX `Filho_nome_key`(`nome`),
    UNIQUE INDEX `Filho_cpf_key`(`cpf`),
    UNIQUE INDEX `Filho_rg_key`(`rg`),
    UNIQUE INDEX `filho_nomeTitular_key`(`nomeTitular`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `project_name_key`(`name`),
    UNIQUE INDEX `project_route_key`(`route`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `residente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` BIGINT NOT NULL,
    `rg` BIGINT NOT NULL,
    `idade` INTEGER NOT NULL,
    `modeloDeTrabalho` VARCHAR(191) NOT NULL,
    `renda` INTEGER NULL,
    `nomeTitular` VARCHAR(191) NOT NULL,
    `cnpjCtps` BIGINT NOT NULL DEFAULT 0,

    UNIQUE INDEX `residente_id_key`(`id`),
    UNIQUE INDEX `residente_nome_key`(`nome`),
    UNIQUE INDEX `residente_cpf_key`(`cpf`),
    UNIQUE INDEX `residente_rg_key`(`rg`),
    UNIQUE INDEX `residente_nomeTitular_key`(`nomeTitular`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `create` BOOLEAN NOT NULL,
    `read` BOOLEAN NOT NULL,
    `update` BOOLEAN NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delt` BOOLEAN NOT NULL,

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titular` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` BIGINT NOT NULL,
    `rg` BIGINT NOT NULL,
    `nis` BIGINT NOT NULL DEFAULT 0,
    `endereco` VARCHAR(191) NOT NULL,
    `modeloDeTrabalho` VARCHAR(191) NOT NULL,
    `cnpjCtps` BIGINT NULL,
    `renda` DOUBLE NULL,
    `idade` INTEGER NOT NULL,
    `situacao` VARCHAR(191) NOT NULL,
    `cel` BIGINT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `representante` VARCHAR(191) NOT NULL DEFAULT 'Toni',
    `estadoCivil` VARCHAR(191) NULL,
    `nameProject` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Titular_id_key`(`id`),
    UNIQUE INDEX `Titular_nome_key`(`nome`),
    UNIQUE INDEX `Titular_cpf_key`(`cpf`),
    UNIQUE INDEX `Titular_rg_key`(`rg`),
    INDEX `titular_nameProject_fkey`(`nameProject`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_name_key`(`name`),
    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `user_name` VARCHAR(191) NOT NULL,
    `role_name` VARCHAR(191) NOT NULL,

    INDEX `user_roles_role_name_fkey`(`role_name`),
    PRIMARY KEY (`user_name`, `role_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conjuge` ADD CONSTRAINT `conjuge_nomeTitular_fkey` FOREIGN KEY (`nomeTitular`) REFERENCES `titular`(`nome`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `filho` ADD CONSTRAINT `filho_nomeTitular_fkey` FOREIGN KEY (`nomeTitular`) REFERENCES `titular`(`nome`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `residente` ADD CONSTRAINT `residente_nomeTitular_fkey` FOREIGN KEY (`nomeTitular`) REFERENCES `titular`(`nome`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titular` ADD CONSTRAINT `titular_nameProject_fkey` FOREIGN KEY (`nameProject`) REFERENCES `project`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_name_fkey` FOREIGN KEY (`role_name`) REFERENCES `role`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_name_fkey` FOREIGN KEY (`user_name`) REFERENCES `user`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
