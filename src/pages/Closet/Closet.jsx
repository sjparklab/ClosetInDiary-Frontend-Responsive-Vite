import React, { useState } from 'react';
import styles from './Closet.module.css';
import Header from '../../components/NormalHeader';
import classNames from 'classnames';
import addNewCategoryImage from '../../assets/images/addNewCategory.png';
import allCategoryImage from '../../assets/images/allCategory.png'
const Diary = () => {
    return (
        <div className={styles.maxSizingContainer}>
            <div className={styles.DiaryContainer}>
                <div className={styles.Header}>
                    <Header />
                </div>
                <div className={styles.main}>
                    <div className={styles.sideleft} />
                    <div className={styles.categorySelector}>
                        <div className={styles.catTitleUnderline}>
                            <div className={styles.categoryTitle}>
                                MY CLOSET
                            </div>
                        </div>
                        <div className={styles.categorySettigns}>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Add New</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={allCategoryImage} alt="" />
                                </div>
                                <p>All</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Tops</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Dresses</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Pants</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Add New</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={allCategoryImage} alt="" />
                                </div>
                                <p>All</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Tops</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Dresses</p>
                            </div>
                            <div className={styles.categorySettingsBox}>
                                <div className={classNames(styles.categoryList, styles.AddNew)}>
                                    <img src={addNewCategoryImage} alt="" />
                                </div>
                                <p>Pants</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.side2} />
                    <div className={styles.side3} />
                    <div className={styles.clothData}>
                        박스
                    </div>
                    <div className={styles.side4} />
                    <div className={styles.side5} />
                    <div className={styles.pageSelector}>
                        1234
                    </div>
                    <div className={styles.sideright} />
                </div>
            </div>
        </div>
    );
};

export default Diary;