#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <math.h>
#include <errno.h>
#include <linux/fs.h>
#include <ext2fs/ext2_fs.h>
//#include "ext2_fs.h"
#include <sys/types.h>
#include <unistd.h>
#include <sys/stat.h>

int main(int argc, char *argv[]) {
	int fd = open(argv[1], O_RDONLY); // argv[1] = /dev/sdb1 
	int count, total_groups;
	int ino, i,j k;
	int bgno, iindex, inode_size, block_size;
	unsigned long inode_offset;
	
	struct ext2_super_block sb; 
	struct ext2_group_desc bgdesc;
	struct ext2_inode inode;
	struct ext2_dir_entry_2 dirent;
	
	ino = atoi(argv[2]);
	if(fd == -1) {
		perror("readsuper:");
		exit(errno);
	}
	printf("size of super block = %d\n", sizeof(struct ext2_super_block));
	printf("size of BG DESC = %d\n", sizeof(struct ext2_group_desc));

	lseek(fd, 1024, SEEK_CUR);  //Skip Boot Block i.e first 1kB
	count = read(fd, &sb, sizeof(struct ext2_super_block));
	printf("Magic: %x\n", sb.s_magic);
	printf("Inodes Count: %d\n", sb.s_inodes_count);
	printf("Blocks Count: %d\n", sb.s_blocks_count);
	printf("Blocks Size: %d\n", sb.s_log_block_size);
	inode_size = sb.s_inode_size;
	block_size = 1024 << sb.s_log_block_size; /*or 1024 + 1024 << sb.s_log_block_size;*/ 
	printf("Last mounted : %s\n", sb.s_last_mounted);
	//lseek(fd, block_size, SEEK_CUR);
	total_groups = ceil(sb.s_blocks_count / sb.s_blocks_per_group);
	//count = read(fd, &bgdesc, sizeof(struct ext2_group_desc) * total_groups);
	//printf("Inode Table: %d\n", bgdesc.bg_inode_table); 
	
	bgno = (ino - 1) / sb.s_inodes_per_group;
	iindex = (ino - 1) % sb.s_inodes_per_group;
	lseek(fd, 1024 + block_size + bgno * sizeof(bgdesc), SEEK_SET);
	count = read(fd, &bgdesc, sizeof(struct ext2_group_desc));
	printf("Inode Table: %d\n", bgdesc.bg_inode_table);
	
	inode_offset = bgdesc.bg_inode_table * block_size + iindex * inode_size;
	lseek(fd, inode_offset, SEEK_SET);
	read(fd, &inode, sizeof(inode));
	printf("Size of file:%d\n", inode.i_size);
	printf("Number of block %d\nBlocks: ", inode.i_blocks);
	for(i = 0; i < 12 && inode.i_block[i]; i++)
	    printf("%d ", inode.i_block[i]);

/*
	if (i < 12 && !inode.i_block[i]) {
	    printf("\n");
	    close(fd);
	    return 0;
	}
	int levels[3] = {1, 2, 3}; // levels of indirection
	int blocks_per_level[3] = {block_size / sizeof(unsigned int), block_size / sizeof(unsigned int) * block_size / sizeof(unsigned int), block_size / sizeof(unsigned int) * block_size / sizeof(unsigned int) * block_size / sizeof(unsigned int)};
	int blocks[blocks_per_level[0] + blocks_per_level[1] + blocks_per_level[2]];
	int num_blocks = 12;
	for (i = 0; i < num_blocks; i++) {
    	    blocks[i] = inode.i_block[i];
	}
}*/
	if (inode.i_block[12] != 0) {
	    printf("\nIndirect Block 1: %d\nBlocks: ", inode.i_block[12]);
	    int indirect_block[block_size/4];
	    lseek(fd, inode.i_block[12] * block_size, SEEK_SET);
	    read(fd, &indirect_block, block_size);
	    for(i = 0; i < block_size/4 && indirect_block[i] != 0; i++) {
		printf("%d ", indirect_block[i]);
	    }
	}
	if (inode.i_block[13] != 0) {
	    printf("\nIndirect Block 2: %d\nBlocks: ", inode.i_block[13]);
	    int indirect_block_1[block_size/4];
	    lseek(fd, inode.i_block[13] * block_size, SEEK_SET);
	    read(fd, &indirect_block_1, block_size);
	    for(i = 0; i < block_size/4 && indirect_block_1[i] != 0; i++) {
		int indirect_block_2[block_size/4];
		lseek(fd, indirect_block_1[i] * block_size, SEEK_SET);
		read(fd, &indirect_block_2, block_size);
		for(j = 0; j < block_size/4 && indirect_block_2[j] != 0; j++) {
		    printf("%d ", indirect_block_2[j]);
		}
	    }
	}

	if (inode.i_block[14] != 0) {
	    printf("\nIndirect Block 3: %d\nBlocks: ", inode.i_block[14]);
	    int indirect_block_1[block_size/4];
	    lseek(fd, inode.i_block[14] * block_size, SEEK_SET);
	    read(fd, &indirect_block_1, block_size);
	    for(i = 0; i < block_size/4 && indirect_block_1[i] != 0; i++) {
		int indirect_block_2[block_size/4];
		lseek(fd, indirect_block_1[i] * block_size, SEEK_SET);
		read(fd, &indirect_block_2, block_size);
		for(j = 0; j < block_size/4 && indirect_block_2[j] != 0; j++) {
		    int indirect_block_3[block_size/4];
		    lseek(fd, indirect_block_2[j] * block_size, SEEK_SET);
		    read(fd, &indirect_block_3, block_size);
		    for(k = 0; k < block_size/4 && indirect_block_3[k] != 0; k++) {
		        printf("%d ", indirect_block_3[k]);
		    }
		}
	    }
	}
	printf("\n");
	close(fd);
}
